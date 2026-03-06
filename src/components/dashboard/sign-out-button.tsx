"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-cyan-300/50 hover:text-cyan-100"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sign out
    </button>
  );
}
