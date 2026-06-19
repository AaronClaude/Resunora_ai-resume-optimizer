"use client";

type AnalysisProgressProps = {
  progress: number;
  stage: string;
};

export function AnalysisProgress({ progress, stage }: AnalysisProgressProps) {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-300">Analyzing your resume</p>
        <p className="mt-1 text-xs text-zinc-500">{stage}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-zinc-500">Progress</span>
          <span className="font-medium text-violet-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
