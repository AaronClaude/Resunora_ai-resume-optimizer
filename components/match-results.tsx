"use client";

import type { AnalysisResult } from "@/types/analysis";

type MatchResultsProps = {
  result: AnalysisResult;
};

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
}

function scoreBarGradient(score: number) {
  if (score >= 80) return "from-violet-500 to-emerald-400";
  if (score >= 60) return "from-violet-500 to-amber-400";
  return "from-violet-500 to-red-400";
}

function KeywordRing({ matched, total }: { matched: number; total: number }) {
  const pct = total > 0 ? (matched / total) * 100 : 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96">
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-zinc-800"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="url(#keywordGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="keywordGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-lg font-bold text-zinc-100">{matched}</p>
        <p className="text-[10px] text-zinc-500">of {total}</p>
      </div>
    </div>
  );
}

export function MatchResults({ result }: MatchResultsProps) {
  const { overallScore, summary, categoryScores, stats, strengths, improvements, missingKeywords } =
    result;

  return (
    <div className="match-results-scroll mt-6 max-h-[calc(100vh-8rem)] space-y-5 overflow-y-auto pr-1">
      {/* Overall score */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Overall match
          </span>
          <span className={`rounded-full bg-zinc-800/80 px-3 py-1 text-sm font-semibold ${scoreColor(overallScore)}`}>
            {overallScore}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${scoreBarGradient(overallScore)} transition-all duration-700`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{summary}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-center">
          <p className="text-lg font-bold text-emerald-400">{stats.strengthsCount}</p>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">Strengths</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-center">
          <p className="text-lg font-bold text-amber-400">{stats.gapsCount}</p>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">Gaps</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-center">
          <p className="text-lg font-bold text-violet-400">{missingKeywords.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">Missing</p>
        </div>
      </div>

      {/* Category breakdown + keyword ring */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Category breakdown
        </p>
        <div className="flex items-center gap-4">
          <KeywordRing matched={stats.matchedKeywords} total={stats.totalKeywords} />
          <div className="flex-1 space-y-2.5">
            {categoryScores.map((cat) => (
              <div key={cat.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{cat.label}</span>
                  <span className={`font-medium ${scoreColor(cat.score)}`}>{cat.score}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${scoreBarGradient(cat.score)}`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] text-zinc-600">Keywords matched</p>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Key strengths
          </p>
          <ul className="space-y-1.5">
            {strengths.slice(0, 4).map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300">
                <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Needs improvement */}
      {improvements.length > 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-amber-400/80">
            Needs improvement
          </p>
          <div className="space-y-3">
            {improvements.map((item, i) => (
              <div key={i} className="rounded-md border border-zinc-800/80 bg-zinc-950/40 p-3">
                <p className="text-xs font-medium text-amber-300">{item.area}</p>
                <p className="mt-1 text-sm text-zinc-400">{item.issue}</p>
                <p className="mt-2 text-sm text-zinc-200">
                  <span className="text-violet-400">→ </span>
                  {item.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing keywords */}
      {missingKeywords.length > 0 && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Missing keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="rounded bg-violet-500/15 px-2 py-0.5 text-xs text-violet-300"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
