"use client";

import React, { useState, useEffect } from "react";
import { Send, Terminal, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function CreateCorners({ children }: { children: React.ReactNode }) {
  const positions = [
    "top-0 -left-3",
    "top-0 -right-3",
    "bottom-0 -left-3",
    "bottom-0 -right-3",
  ];

  return (
    <div className="absolute z-10 inset-0 pointer-events-none">
      {positions.map((pos, index) => (
        <section key={index} className={`absolute ${pos}`}>
          {children}
        </section>
      ))}
    </div>
  );
}

interface SecureMessageGatewayProps {
  onSubmit?: (message: string, email: string) => void;
  title?: string;
  subtitle?: string;
}

export function SecureMessageGateway({
  onSubmit,
  title = "Secure Message Gateway",
  subtitle = "Send us a direct message",
}: SecureMessageGatewayProps) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [secureId, setSecureId] = useState("00000");

  // Generate secure ID only on client side to avoid hydration mismatch
  useEffect(() => {
    setSecureId(Math.random().toString(16).slice(2, 7).toUpperCase());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim() || !email.trim() || pending) return;

    setPending(true);
    setErrorText("");
    setSuccess(false);

    try {
      const res = await fetch("/contact/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorText(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send message right now. Please try again later."
        );
        return;
      }

      setSuccess(true);
      onSubmit?.(message, email);
    } catch {
      setErrorText("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="relative w-full max-w-2xl bg-transparent border border-swarp-cyan/30 border-dashed shadow-sm p-6 sm:p-10 transition-all rounded-none">

        <CreateCorners>
          <PlusIcon className="w-4 h-4 text-swarp-cyan" strokeWidth={1.5} />
        </CreateCorners>

        {/* Diagonal Fade Grid Background */}
        <div className="min-h-full z-0 w-full bg-transparent absolute top-0 left-0 pointer-events-none">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,255,240,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,255,240,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            }}
          />
        </div>

        <div className="backdrop-blur-sm p-2 rounded-none relative z-10">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-1 flex border-b border-b-swarp-cyan pb-2 items-center gap-2">
              <div className="size-1.5 bg-swarp-cyan rounded-full animate-pulse" />
              <span className="text-swarp-cyan">ENCRYPTED CHANNEL</span>
            </h2>
            <h1 className="text-xl font-semibold text-white tracking-tight mt-3">
              <span className="text-swarp-cyan">{title.split(" ")[0]} </span>
              {title.split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-swarp-cyan opacity-0 group-focus-within:opacity-100 transition-all z-10" />
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-swarp-cyan opacity-0 group-focus-within:opacity-100 transition-all z-10" />

              <input
                type="email"
                autoComplete="email"
                placeholder="YOUR_EMAIL@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
                className={cn(
                  "w-full bg-swarp-dark/30 border border-swarp-cyan/20 rounded-none h-10",
                  "font-mono text-[0.75rem] p-3 outline-none transition-all",
                  "placeholder:text-gray-600 text-white",
                  "focus:bg-swarp-cyan/5 focus:ring-1 focus:ring-swarp-cyan/20 focus:border-swarp-cyan border-dashed",
                  pending && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>

            {/* Message Input + Submit */}
            <div className="flex sm:flex-row items-stretch gap-2">
              <div className="relative flex-1 group">
                <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-swarp-cyan opacity-0 group-focus-within:opacity-100 transition-all z-10" />
                <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-swarp-cyan opacity-0 group-focus-within:opacity-100 transition-all z-10" />

                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-swarp-cyan transition-colors z-10">
                  <Terminal size={14} />
                </div>

                <input
                  type="text"
                  autoComplete="off"
                  placeholder="ENTER MESSAGE >>"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={pending}
                  className={cn(
                    "w-full bg-swarp-dark/30 border border-swarp-cyan/20 rounded-none h-10",
                    "font-mono text-[0.75rem] p-3 pl-10 outline-none transition-all",
                    "placeholder:text-gray-600 text-white",
                    "focus:bg-swarp-cyan/5 focus:ring-1 focus:ring-swarp-cyan/20 focus:border-swarp-cyan border-dashed",
                    pending && "opacity-50 cursor-not-allowed"
                  )}
                />
              </div>

              {errorText && <p className="text-red-400 text-xs font-mono">{errorText}</p>}
              <button
                type="submit"
                disabled={pending || !message.trim() || !email.trim()}
                className={cn(
                  "px-8 h-full border bg-swarp-dark/50 font-bold uppercase text-[0.6rem] tracking-[0.2em] min-h-10 border-dashed border-swarp-cyan/30 transition-all flex items-center justify-center gap-2 rounded-none text-gray-400",
                  !pending && message.trim() && email.trim() && "hover:border-swarp-cyan hover:text-swarp-cyan hover:bg-swarp-cyan/5 active:scale-95",
                  (pending || !message.trim() || !email.trim()) && "opacity-40 cursor-not-allowed"
                )}
              >
                <Send size={12} className={cn(pending && "animate-bounce")} />
                <span>{pending ? "SENDING..." : success ? "SENT!" : "TRANSMIT"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Status Line */}
        <div className="mt-6 flex items-center justify-between relative z-10">
          <span className="text-[0.55rem] font-mono uppercase tracking-widest text-gray-500">
            Status:{" "}
            {pending ? (
              <span className="text-yellow-500">Establishing Handshake...</span>
            ) : success ? (
              <span className="text-swarp-cyan border p-0.5 border-swarp-cyan">Transmitted</span>
            ) : (
              <span className="text-swarp-cyan border p-0.5 border-swarp-cyan">Ready</span>
            )}
          </span>
          <span className="text-[0.55rem] font-mono text-gray-600">
            SECURE_ID: 0x{secureId}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SecureMessageGateway;
