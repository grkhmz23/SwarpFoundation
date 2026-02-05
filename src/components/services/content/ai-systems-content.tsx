"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Brain, MessageSquare, Zap, Shield, 
  Workflow, Database, LineChart, Sparkles, Cpu,
  ChevronRight, CheckCircle2, FileText, Send,
  Settings, Mic, Image as ImageIcon, Code,
  Upload, X, Play, Pause, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ModelConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

// Simulated Chat Hook
function useSimulatedChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm an AI assistant powered by Swarp's infrastructure. I can help with data analysis, document processing, and automated workflows. Try asking me about your Q3 sales data or upload a document for analysis.",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can analyze that data for you. Based on the patterns, I see a 24% increase in engagement metrics compared to last quarter. Would you like me to generate a detailed report?",
        "I've processed your document. The key insights are: 1) Customer retention improved by 15%, 2) Average order value increased to $127, 3) Churn rate decreased to 4.2%.",
        "Great question! I can help you set up an automated workflow for this. Based on your requirements, I recommend using our RAG pipeline with real-time vector search.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Simulate streaming effect
      let charIndex = 0;
      const streamInterval = setInterval(() => {
        if (charIndex >= randomResponse.length) {
          clearInterval(streamInterval);
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsg.id ? { ...m, isStreaming: false } : m))
          );
        }
        charIndex += 3;
      }, 20);
    }, 1500);
  };

  return { messages, isTyping, sendMessage };
}

// Chat Interface Component
function ChatInterface() {
  const { messages, isTyping, sendMessage } = useSimulatedChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] rounded-xl overflow-hidden border border-emerald-500/20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/20 bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">AI Assistant</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              msg.role === "assistant" 
                ? "bg-emerald-500/20 border border-emerald-500/30" 
                : "bg-purple-500/20 border border-purple-500/30"
            )}>
              {msg.role === "assistant" ? (
                <Bot className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="text-xs font-bold text-purple-400">You</span>
              )}
            </div>
            <div className={cn(
              "max-w-[80%] p-3 rounded-xl text-xs leading-relaxed",
              msg.role === "assistant"
                ? "bg-emerald-950/30 border border-emerald-500/20 text-gray-200"
                : "bg-purple-950/30 border border-purple-500/20 text-gray-200"
            )}>
              {msg.isStreaming ? (
                <span className="animate-pulse">{msg.content}▊</span>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-emerald-500/20 bg-[#09090b]">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
            <Upload className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
            <Mic className="w-4 h-4" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <button 
            onClick={handleSend}
            className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// RAG Pipeline Visualization
function RAGPipeline() {
  const [stage, setStage] = useState<"idle" | "uploading" | "processing" | "indexing" | "ready">("idle");
  const [progress, setProgress] = useState(0);

  const startProcess = () => {
    setStage("uploading");
    setProgress(0);

    const stages = [
      { stage: "uploading", duration: 1000, progress: 20 },
      { stage: "processing", duration: 1500, progress: 50 },
      { stage: "indexing", duration: 1500, progress: 80 },
      { stage: "ready", duration: 500, progress: 100 },
    ];

    let currentStage = 0;
    const runStage = () => {
      if (currentStage >= stages.length) return;

      const s = stages[currentStage];
      setStage(s.stage as any);

      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= s.progress) {
            clearInterval(interval);
            currentStage++;
            setTimeout(runStage, 200);
            return p;
          }
          return p + 1;
        });
      }, s.duration / (s.progress - (stages[currentStage - 1]?.progress || 0)));
    };

    runStage();
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-emerald-500/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          RAG Pipeline
        </h4>
        <button
          onClick={startProcess}
          disabled={stage !== "idle" && stage !== "ready"}
          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          {stage === "ready" ? <RefreshCw className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {stage === "ready" ? "Restart" : "Start Demo"}
        </button>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-3">
        {[
          { id: "uploading", label: "Document Upload", icon: FileText },
          { id: "processing", label: "Text Extraction", icon: Cpu },
          { id: "indexing", label: "Vector Indexing", icon: Database },
          { id: "ready", label: "Query Ready", icon: CheckCircle2 },
        ].map((step, idx) => {
          const isActive = stage === step.id;
          const isCompleted = [
            "processing", "indexing", "ready"
          ].includes(stage) && ["uploading"].includes(step.id) ||
          ["indexing", "ready"].includes(stage) && ["processing"].includes(step.id) ||
          stage === "ready" && step.id !== "ready";

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                opacity: isActive || isCompleted ? 1 : 0.4,
                scale: isActive ? 1.02 : 1,
              }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                isActive
                  ? "bg-emerald-950/30 border-emerald-500/30"
                  : isCompleted
                  ? "bg-emerald-950/20 border-emerald-500/20"
                  : "bg-white/5 border-white/10"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                isActive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : isCompleted
                  ? "bg-emerald-500/10 text-emerald-500/60"
                  : "bg-white/5 text-gray-500"
              )}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-white">{step.label}</div>
                <div className="text-[10px] text-gray-500">
                  {isActive ? "Processing..." : isCompleted ? "Complete" : "Waiting"}
                </div>
              </div>
              {isActive && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

// Model Configurator
function ModelConfigurator() {
  const [config, setConfig] = useState<ModelConfig>({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: "You are a helpful AI assistant specialized in data analysis.",
  });

  const models = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI", color: "emerald" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic", color: "amber" },
    { id: "llama-3", name: "Llama 3", provider: "Meta", color: "purple" },
    { id: "mistral", name: "Mistral", provider: "Mistral AI", color: "cyan" },
  ];

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Settings className="w-4 h-4 text-emerald-400" />
        Model Configuration
      </h4>

      {/* Model Selection */}
      <div className="space-y-3 mb-4">
        <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
          Model
        </label>
        <div className="grid grid-cols-2 gap-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setConfig({ ...config, model: model.id })}
              className={cn(
                "p-2.5 rounded-lg border text-left transition-all",
                config.model === model.id
                  ? `bg-${model.color}-500/10 border-${model.color}-500/30`
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              <div className={cn(
                "text-xs font-semibold",
                config.model === model.id ? `text-${model.color}-400` : "text-white"
              )}>
                {model.name}
              </div>
              <div className="text-[9px] text-gray-500">{model.provider}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Slider */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
            Temperature
          </label>
          <span className="text-[10px] text-emerald-400 font-mono">{config.temperature}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={config.temperature}
          onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
          className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[9px] text-gray-600">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>

      {/* Max Tokens */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
            Max Tokens
          </label>
          <span className="text-[10px] text-emerald-400 font-mono">{config.maxTokens}</span>
        </div>
        <input
          type="range"
          min="256"
          max="4096"
          step="256"
          value={config.maxTokens}
          onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
          className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      {/* System Prompt */}
      <div className="space-y-2">
        <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
          System Prompt
        </label>
        <textarea
          value={config.systemPrompt}
          onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 resize-none"
        />
      </div>
    </div>
  );
}

// Main Component
export function AISystemsContent() {
  const [activeTab, setActiveTab] = useState<"chat" | "rag" | "config">("chat");

  return (
    <div className="h-full bg-[#0a0f1a] text-gray-200 overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Systems</h3>
              <p className="text-[10px] text-emerald-400">LLM Integration & RAG</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: "chat", label: "Chat", icon: MessageSquare },
              { id: "rag", label: "RAG", icon: Database },
              { id: "config", label: "Config", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-500 hover:text-white"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column - Main Feature */}
            <div className="h-full">
              {activeTab === "chat" && <ChatInterface />}
              {activeTab === "rag" && <RAGPipeline />}
              {activeTab === "config" && <ModelConfigurator />}
            </div>

            {/* Right Column - Secondary Info */}
            <div className="space-y-3 overflow-y-auto custom-scrollbar">
              {/* Capabilities */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-3">
                <h4 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Capabilities
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: MessageSquare, label: "Chatbots", desc: "Conversational AI" },
                    { icon: Brain, label: "RAG", desc: "Document Q&A" },
                    { icon: Workflow, label: "Agents", desc: "Auto-tasks" },
                    { icon: Code, label: "Code", desc: "Assistants" },
                  ].map((cap) => (
                    <div
                      key={cap.label}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                    >
                      <cap.icon className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                      <div className="text-[10px] font-medium text-white">{cap.label}</div>
                      <div className="text-[9px] text-gray-500">{cap.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-3">
                <h4 className="text-xs font-semibold text-white mb-3">Common Use Cases</h4>
                <div className="space-y-2">
                  {[
                    { icon: "💬", title: "Customer Support", desc: "24/7 intelligent agents" },
                    { icon: "📊", title: "Data Analysis", desc: "Natural language insights" },
                    { icon: "🎯", title: "Sales Automation", desc: "Lead qualification" },
                    { icon: "💻", title: "Dev Tools", desc: "Code assistants" },
                  ].map((useCase, idx) => (
                    <motion.div
                      key={useCase.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                    >
                      <span className="text-base">{useCase.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-medium text-white">{useCase.title}</div>
                        <div className="text-[9px] text-gray-500">{useCase.desc}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-3">
                <h4 className="text-xs font-semibold text-white mb-2">Supported Models</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["GPT-4", "Claude 3", "Llama 3", "Mistral", "Vector DBs", "LangChain"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-full text-[9px] bg-white/5 border border-white/10 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Latency", value: "<100ms", color: "emerald" },
                  { label: "Uptime", value: "99.9%", color: "cyan" },
                  { label: "Models", value: "20+", color: "purple" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-center"
                  >
                    <div className={cn("text-sm font-bold", `text-${stat.color}-400`)}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AISystemsContent;