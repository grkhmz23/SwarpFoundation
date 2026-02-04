"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SendIcon,
  LoaderIcon,
  Sparkles,
  RefreshCw,
  Trash2,
  StopCircle,
  Code,
  FileText,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  status?: "queued" | "sending" | "streaming" | "done" | "error";
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function clamp(s: string, max = 8000) {
  return s.length > max ? s.slice(0, max) : s;
}

function mergeAssistantDelta(prev: string, delta: string) {
  return clamp((prev ?? "") + (delta ?? ""), 12000);
}

function isSSE(resp: Response) {
  const ct = resp.headers.get("content-type") || "";
  return ct.includes("text/event-stream");
}

function safeJsonParse(line: string) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}

function useGreeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return greeting;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY));
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

const quickActions = [
  { icon: <Code className="w-4 h-4" />, label: "Code" },
  { icon: <FileText className="w-4 h-4" />, label: "Docs" },
  { icon: <Lightbulb className="w-4 h-4" />, label: "Ideas" },
  { icon: <Rocket className="w-4 h-4" />, label: "Build" },
];

export default function SwarpAIChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [queue, setQueue] = useState<string[]>([]);
  const [activeJob, setActiveJob] = useState<null | { userId: string; assistantId: string }>(null);
  const abortRef = useRef<AbortController | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 52, maxHeight: 200 });

  const isBusy = !!activeJob;
  const hasMessages = messages.length > 0;
  const greeting = useGreeting();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, messages[messages.length - 1]?.content]);

  useEffect(() => {
    if (activeJob || queue.length === 0) return;

    const nextUserId = queue[0];
    const assistantId = uid();
    setActiveJob({ userId: nextUserId, assistantId });

    setMessages((prev) => [
      ...prev.map((m) => (m.id === nextUserId ? { ...m, status: "sending" as const } : m)),
      { id: assistantId, role: "assistant" as const, content: "", createdAt: Date.now(), status: "streaming" as const },
    ]);

    void runChatCompletion(nextUserId, assistantId);
  }, [queue, activeJob]);

  async function runChatCompletion(userId: string, assistantId: string) {
    const history = (() => {
      const idx = messages.findIndex((m) => m.id === userId);
      const upto = idx >= 0 ? messages.slice(0, idx + 1) : messages;
      return upto.filter((m) => m.role === "user" || m.role === "assistant").map((m) => ({ role: m.role, content: m.content }));
    })();

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const resp = await fetch("/swarp-ai/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ac.signal,
        body: JSON.stringify({ messages: history }),
      });

      if (!resp.ok) throw new Error(await resp.text().catch(() => `Request failed (${resp.status})`));

      if (isSSE(resp) && resp.body) {
        await consumeSSE(resp, assistantId);
      } else {
        const json = await resp.json();
        const text = json?.choices?.[0]?.message?.content ?? json?.choices?.[0]?.text ?? json?.content ?? "";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: clamp(String(text)), status: "done" } : m.id === userId ? { ...m, status: "done" } : m
          )
        );
      }

      setQueue((q) => q.slice(1));
      setActiveJob(null);
    } catch (e: unknown) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: "Something went wrong. Try again?", status: "error" } : m.id === userId ? { ...m, status: "error" } : m
        )
      );
      setQueue((q) => q.slice(1));
      setActiveJob(null);
    }
  }

  async function consumeSSE(resp: Response, assistantId: string) {
    const reader = resp.body!.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n\n")) >= 0) {
          const frame = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          for (const line of frame.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") {
              setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, status: "done" } : m)));
              if (payload === "[DONE]") return;
              continue;
            }
            const json = safeJsonParse(payload);
            const delta = json?.choices?.[0]?.delta?.content ?? json?.choices?.[0]?.message?.content ?? json?.delta ?? "";
            if (delta) {
              setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: mergeAssistantDelta(m.content, String(delta)) } : m)));
            }
          }
        }
      }
    }
    setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, status: "done" } : m)));
  }

  function enqueueUserMessage(text: string) {
    const cleaned = text.trim();
    if (!cleaned) return;
    const id = uid();
    setMessages((prev) => [...prev, { id, role: "user", content: clamp(cleaned, 4000), createdAt: Date.now(), status: "queued" }]);
    setQueue((q) => [...q, id]);
  }

  function onSend() {
    enqueueUserMessage(draft);
    setDraft("");
    adjustHeight(true);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (draft.trim()) onSend();
    }
  }

  function retryLast() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user" && m.status === "error");
    if (lastUser) enqueueUserMessage(lastUser.content);
  }

  function stop() {
    abortRef.current?.abort();
    if (activeJob?.assistantId) setMessages((prev) => prev.map((m) => (m.id === activeJob.assistantId ? { ...m, status: "done" } : m)));
    setActiveJob(null);
    setQueue((q) => q.slice(1));
  }

  function clearChat() {
    setMessages([]);
    setQueue([]);
    setActiveJob(null);
  }

  return (
    <div className="flex-1 flex flex-col w-full text-white relative">
      <AnimatePresence mode="wait">
        {!hasMessages ? (
          <motion.div
            key="landing"
            className="flex-1 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Greeting */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#9D4EDD] flex items-center justify-center shadow-lg shadow-[#00D4FF]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-white/90">{greeting}</h1>
            </div>

            {/* Input */}
            <div className="w-full max-w-2xl">
              <div 
                className="relative rounded-2xl border border-[#00D4FF]/20 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(5, 7, 20, 0.95) 100%)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(0, 255, 240, 0.1)",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    adjustHeight();
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="How can I help you today?"
                  className="w-full px-5 py-4 pr-24 resize-none bg-transparent text-white/90 text-[15px] focus:outline-none placeholder:text-white/30 min-h-[56px] max-h-[200px]"
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <span className="text-[11px] text-[#00FFF0]/50 hidden sm:block">Swarp AI</span>
                  <button
                    onClick={onSend}
                    disabled={!draft.trim()}
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                      draft.trim() 
                        ? "bg-gradient-to-r from-[#00D4FF] to-[#00FFF0] text-[#050714] shadow-lg shadow-[#00D4FF]/30" 
                        : "bg-white/5 text-white/30 border border-white/10"
                    )}
                  >
                    <SendIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => {
                      setDraft(`Help me with ${action.label.toLowerCase()}: `);
                      textareaRef.current?.focus();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-[#00FFF0] border border-white/10 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5 transition-all"
                    style={{
                      background: "linear-gradient(135deg, rgba(10, 14, 39, 0.7) 0%, rgba(5, 7, 20, 0.8) 100%)",
                    }}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="chat" className="flex-1 flex flex-col px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-6 space-y-5 max-w-3xl mx-auto w-full">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="py-4 max-w-3xl mx-auto w-full">
              <div 
                className="relative rounded-2xl border border-[#00D4FF]/20 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(5, 7, 20, 0.95) 100%)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 212, 255, 0.05), inset 0 1px 0 rgba(0, 255, 240, 0.08)",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    adjustHeight();
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Message Swarp AI..."
                  className="w-full px-4 py-3 pr-12 resize-none bg-transparent text-white/90 text-sm focus:outline-none placeholder:text-white/30 min-h-[48px] max-h-[200px]"
                />
                <button
                  onClick={onSend}
                  disabled={!draft.trim()}
                  className={cn(
                    "absolute right-3 bottom-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                    draft.trim() 
                      ? "bg-gradient-to-r from-[#00D4FF] to-[#00FFF0] text-[#050714]" 
                      : "bg-white/5 text-white/30"
                  )}
                >
                  {isBusy ? <LoaderIcon className="w-3.5 h-3.5 animate-spin" /> : <SendIcon className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {isBusy ? (
                    <button onClick={stop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-[#00FFF0] transition-colors">
                      <StopCircle className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button onClick={retryLast} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-[#00FFF0] transition-colors">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                    </button>
                  )}
                  <button onClick={clearChat} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
                <span className="text-[10px] text-white/25">Press Enter to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMsg }) {
  const isUser = msg.role === "user";
  const isStreaming = msg.role === "assistant" && (msg.status === "streaming" || msg.status === "sending");

  return (
    <motion.div className={cn("flex", isUser ? "justify-end" : "justify-start")} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className={cn("max-w-[85%] flex items-start gap-3", isUser ? "flex-row-reverse" : "")}>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-medium",
            isUser 
              ? "bg-gradient-to-br from-[#9D4EDD] to-[#00D4FF] text-white shadow-lg shadow-[#9D4EDD]/20" 
              : "bg-gradient-to-br from-[#00D4FF]/20 to-[#00FFF0]/10 border border-[#00D4FF]/30"
          )}
        >
          {isUser ? "U" : <Sparkles className="w-4 h-4 text-[#00FFF0]" />}
        </div>
        <div 
          className={cn(
            "rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
            isUser 
              ? "bg-gradient-to-br from-[#9D4EDD] to-[#00D4FF] text-white shadow-lg shadow-[#9D4EDD]/20" 
              : "text-white/90 border border-white/10"
          )}
          style={!isUser ? {
            background: "linear-gradient(135deg, rgba(10, 14, 39, 0.8) 0%, rgba(5, 7, 20, 0.9) 100%)",
          } : undefined}
        >
          {isStreaming && !msg.content ? <TypingDots /> : <span className="whitespace-pre-wrap">{msg.content}</span>}
          {isStreaming && msg.content && <span className="inline-block w-1.5 h-4 bg-[#00FFF0] ml-1 animate-pulse rounded-sm" />}
        </div>
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-[#00FFF0] rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          style={{ boxShadow: "0 0 8px rgba(0, 255, 240, 0.5)" }}
        />
      ))}
    </div>
  );
}