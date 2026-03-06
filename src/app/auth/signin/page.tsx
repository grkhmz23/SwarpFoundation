"use client";

import { useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Chrome, ShieldCheck, WalletCards } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  async function handleGoogleSignIn() {
    setLoading(true);
    await signIn("google", { callbackUrl });
  }

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 text-white sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl gap-6 rounded-3xl border border-white/10 bg-[#081326]/70 p-6 backdrop-blur-sm md:grid-cols-2 md:p-10">
        <section>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Swarp Client Dashboard</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Sign in to submit and fund projects</h1>
          <p className="mt-4 text-slate-300">
            Register instantly with Google. After sign-in you can select services, submit project wishes,
            get a Project ID, and use that ID as reference for bank transfer.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <Feature icon={<ShieldCheck className="h-4 w-4" />} label="Google-authenticated secure workspace" />
            <Feature icon={<WalletCards className="h-4 w-4" />} label="Project ID + bank transfer reference flow" />
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-semibold">Continue with Google</h2>
            <p className="mt-2 text-sm text-slate-300">Use your Google account to create or access your Swarp dashboard.</p>
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/20 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Chrome className="h-4 w-4" />
              {loading ? "Redirecting..." : "Sign in with Google"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-cyan-100">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
