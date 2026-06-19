export type CategoryScore = {
  label: string;
  score: number;
};

export type ImprovementItem = {
  area: string;
  issue: string;
  suggestion: string;
};

export type AnalysisResult = {
  overallScore: number;
  summary: string;
  categoryScores: CategoryScore[];
  stats: {
    matchedKeywords: number;
    totalKeywords: number;
    strengthsCount: number;
    gapsCount: number;
  };
  strengths: string[];
  improvements: ImprovementItem[];
  missingKeywords: string[];
};
