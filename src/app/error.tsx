"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-slate-100 sm:px-6">
      <div className="rounded-2xl border border-cyan-300/20 bg-[#081326]/85 p-8 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-3 text-slate-300">Please refresh the page or try again.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg border border-cyan-200/40 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-50 hover:bg-cyan-300/25"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
