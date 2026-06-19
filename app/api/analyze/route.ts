// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import type { AnalysisResult } from '@/types/analysis';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const ANALYSIS_SCHEMA = `{
  "overallScore": <number 0-100>,
  "summary": "<1-2 concise sentences summarizing fit>",
  "categoryScores": [
    { "label": "Skills Match", "score": <number> },
    { "label": "Experience", "score": <number> },
    { "label": "Keywords", "score": <number> },
    { "label": "Education & Certs", "score": <number> }
  ],
  "stats": {
    "matchedKeywords": <number>,
    "totalKeywords": <number>,
    "strengthsCount": <number>,
    "gapsCount": <number>
  },
  "strengths": ["<short bullet>", ...],
  "improvements": [
    { "area": "<section name>", "issue": "<specific gap>", "suggestion": "<actionable fix>" }
  ],
  "missingKeywords": ["<keyword>", ...]
}`;

function parseAnalysisResponse(text: string): AnalysisResult {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid analysis format');
  }

  const parsed = JSON.parse(jsonMatch[0]) as AnalysisResult;

  parsed.overallScore = Math.min(100, Math.max(0, Math.round(parsed.overallScore)));
  parsed.categoryScores = (parsed.categoryScores ?? []).map((c) => ({
    label: c.label,
    score: Math.min(100, Math.max(0, Math.round(c.score))),
  }));
  parsed.strengths = parsed.strengths ?? [];
  parsed.improvements = parsed.improvements ?? [];
  parsed.missingKeywords = parsed.missingKeywords ?? [];
  parsed.stats = {
    matchedKeywords: parsed.stats?.matchedKeywords ?? 0,
    totalKeywords: parsed.stats?.totalKeywords ?? 0,
    strengthsCount: parsed.stats?.strengthsCount ?? parsed.strengths.length,
    gapsCount: parsed.stats?.gapsCount ?? parsed.improvements.length,
  };

  return parsed;
}

export async function POST(request: Request) {
  try {
    const { fileData, fileType, jobDescription } = await request.json();

    if (!fileData) {
      return NextResponse.json({ error: 'No resume file data provided' }, { status: 400 });
    }

    const targetPrompt = `
      You are an expert ATS (Applicant Tracking System) Resume Reviewer.
      Analyze the attached resume thoroughly against the provided job description.

      Return ONLY valid JSON (no markdown, no code fences) matching this exact schema:
      ${ANALYSIS_SCHEMA}

      Rules:
      - Be precise and specific — reference actual resume content and job requirements.
      - Keep summary to 1-2 sentences max.
      - Include 3-5 strengths, each one short sentence.
      - Include 2-4 improvements with clear area, issue, and actionable suggestion.
      - List 3-8 missing keywords/skills from the job description not found on the resume.
      - categoryScores must reflect realistic sub-scores that align with overallScore.
      - stats.matchedKeywords and stats.totalKeywords should reflect keyword analysis from the job posting.
      - stats.strengthsCount and stats.gapsCount must match the array lengths.

      Target Job Description:
      ${jobDescription || 'Not provided'}
    `;

    let contents: any[] = [targetPrompt];

    if (fileType.startsWith('image/') || fileType === 'application/pdf') {
      contents.push({
        inlineData: {
          data: fileData,
          mimeType: fileType,
        },
      });
    } else {
      contents.push(`Candidate Resume Content:\n${fileData}`);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    const analysis = parseAnalysisResponse(response.text ?? '');

    return NextResponse.json({ analysis });

  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to process resume analysis.' }, { status: 500 });
  }
}
