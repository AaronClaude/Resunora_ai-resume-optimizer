"use client";

import { useCallback, useRef, useState } from "react";

const ACCEPTED_EXTENSIONS = [".png", ".jpeg", ".jpg", ".docx", ".pdf"] as const;

const ACCEPTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const ACCEPT_ATTRIBUTE = ".png,.jpeg,.jpg,.docx,.pdf,image/png,image/jpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAcceptedFile(file: File) {
  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  const mimeMatch = ACCEPTED_MIME_TYPES.includes(
    file.type as (typeof ACCEPTED_MIME_TYPES)[number]
  );
  const extensionMatch = ACCEPTED_EXTENSIONS.includes(
    extension as (typeof ACCEPTED_EXTENSIONS)[number]
  );
  return mimeMatch || extensionMatch;
}

type ResumeUploadProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

export function ResumeUpload({ file, onFileChange }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (selected: File | null) => {
      if (!selected) return;

      if (!isAcceptedFile(selected)) {
        setError("Please upload a PNG, JPEG, JPG, DOCX, or PDF file.");
        onFileChange(null);
        return;
      }

      setError(null);
      onFileChange(selected);
    },
    [onFileChange]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    handleFile(selected);
  }

  function handleRemove() {
    onFileChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-300">
        Resume file
      </label>

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition ${
            isDragging
              ? "border-violet-500/60 bg-violet-500/10"
              : "border-zinc-700 bg-zinc-900/40 hover:border-violet-500/40 hover:bg-zinc-900/60"
          }`}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-sm font-medium text-zinc-200">
            Drop your resume here, or{" "}
            <span className="text-violet-400">browse files</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            PNG, JPEG, JPG, DOCX, or PDF — max 10 MB
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">{file.name}</p>
              <p className="text-xs text-zinc-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
          >
            Remove
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
