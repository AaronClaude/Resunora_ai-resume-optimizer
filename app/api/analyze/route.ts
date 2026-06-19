// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(request: Request) {
  try {
    const { fileData, fileType, jobDescription } = await request.json();

    if (!fileData) {
      return NextResponse.json({ error: 'No resume file data provided' }, { status: 400 });
    }

    const targetPrompt = `
      You are an expert ATS (Applicant Tracking System) Resume Reviewer.
      Analyze the attached resume context thoroughly against the provided job description.
      
      Provide a clean review structured exactly with these sections:
      1. Overall Match Score (Provide a single clean number out of 100)
      2. Strengths (What aligns perfectly with the target job posting)
      3. Weaknesses (Where the profile falls short for this position)
      4. Missing Keywords & Skills (Vital phrases from the description lacking on the resume)
      5. Actionable Tailoring Suggestions (Direct advice to fix alignment gaps)

      Target Job Description:
      ${jobDescription || 'Not provided'}
    `;

    // Establish multi-modal contents array initialization
    let contents: any[] = [targetPrompt];

    // If it is an image asset or an analytical PDF configuration, feed it directly as inlineData objects
    if (fileType.startsWith('image/') || fileType === 'application/pdf') {
      contents.push({
        inlineData: {
          data: fileData,      // Base64 text sequence
          mimeType: fileType   // image/jpeg, image/png, application/pdf
        }
      });
    } else {
      // Otherwise, process normally as standard plain layout text strings
      contents.push(`Candidate Resume Content:\n${fileData}`);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    return NextResponse.json({ analysis: response.text });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to process resume analysis.' }, { status: 500 });
  }
}