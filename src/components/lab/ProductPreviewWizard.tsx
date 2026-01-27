"use client";

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Terminal, 
  Bot, 
  Cpu, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Download, 
  Share2, 
  Loader2, 
  Layout, 
  MessageSquare, 
  Inbox, 
  ShieldCheck, 
  X,
  Play,
  Smartphone,
  Heart,
  User,
  Home,
  Search,
  Bell,
} from 'lucide-react';

// --- Types & Constants ---

const CATEGORIES = [
  { id: 'website', label: 'Website & Apps', icon: Globe, desc: 'Web platforms & Mobile apps' },
  { id: 'software', label: 'Software & Tools', icon: Terminal, desc: 'CLI & Installation flow' },
  { id: 'ai', label: 'AI', icon: Bot, desc: 'Chat interface demo' },
  { id: 'hardware', label: 'Hardware & Devices', icon: Cpu, desc: 'Product concept mock' },
];

const COLORS = [
  { name: 'Swarp Blue', hex: '#00D4FF' },
  { name: 'Swarp Purple', hex: '#9D4EDD' },
  { name: 'Swarp Cyan', hex: '#00FFF0' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Amber', hex: '#f59e0b' },
];

const INDUSTRIES = [
  'SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Cybersecurity', 'Logistics', 'Social Network', 'Dating', 'Marketplace', 'DeFi', 'Web3'
];

// --- Interface ---
interface ConfigType {
  category: string;
  name: string;
  color: string;
  industry: string;
  description: string;
  platform: string;
}

// --- Templates ---

// 1. Website / App Template
const WebsiteTemplate = ({ config }: { config: ConfigType }) => {
  const isMobile = config.platform === 'Mobile App';

  // --- Mobile App View ---
  if (isMobile) {
    return (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center p-8 overflow-hidden">
        {/* Phone Frame */}
        <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3rem] shadow-2xl border-[8px] border-slate-800 overflow-hidden ring-1 ring-slate-700/50">
           {/* Notch/Island */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>

           {/* Status Bar */}
           <div className="absolute top-2 w-full px-6 flex justify-between text-[10px] font-medium text-white z-20">
             <span>9:41</span>
             <div className="flex gap-1">
               <div className="w-4 h-2.5 bg-white rounded-[1px]"></div>
             </div>
           </div>

           {/* App Content */}
           <div className="w-full h-full bg-slate-950 flex flex-col pt-10 pb-4 relative">

              {/* App Header */}
              <div className="px-5 pb-4 flex justify-between items-center bg-slate-950 z-10">
                <div className="font-bold text-lg flex items-center gap-2 text-white">
                   <div className="w-6 h-6 rounded-md flex items-center justify-center text-slate-900 text-xs font-bold" style={{ backgroundColor: config.color }}>
                      {config.name.substring(0, 1)}
                   </div>
                   {config.name}
                </div>
                <Bell size={20} className="text-slate-400" />
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-4 pb-20 no-scrollbar">

                {config.industry === 'Dating' ? (
                   /* Dating UI */
                   <div className="flex flex-col h-full gap-4">
                      <div className="relative aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden shadow-md">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-2xl font-bold">Alex, 28</h3>
                            <p className="opacity-90 text-sm">Product Designer • 2 miles away</p>
                         </div>
                      </div>
                      <div className="flex justify-center gap-6 mt-2">
                         <button className="w-14 h-14 rounded-full bg-slate-800 shadow-lg flex items-center justify-center text-rose-500 border border-slate-700 hover:scale-110 transition-transform">
                            <X size={24} />
                         </button>
                         <button 
                            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"
                            style={{ backgroundColor: config.color }}
                         >
                            <Heart size={24} fill="currentColor" />
                         </button>
                      </div>
                   </div>
                ) : config.industry === 'Social Network' ? (
                   /* Social Feed UI */
                   <div className="space-y-4">
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                         {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
                               <div className="w-14 h-14 rounded-full ring-2 ring-offset-2 ring-offset-slate-950 bg-slate-700" style={{ borderColor: config.color }}></div>
                               <span className="text-[10px] text-slate-500">User {i}</span>
                            </div>
                         ))}
                      </div>
                      {[1, 2].map(i => (
                         <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                               <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                               <div>
                                  <div className="text-xs font-bold text-white">Sarah Jenkins</div>
                                  <div className="text-[10px] text-slate-500">2h ago</div>
                               </div>
                            </div>
                            <div className="h-32 bg-slate-800 rounded-lg mb-3"></div>
                            <div className="flex gap-4 text-slate-500">
                               <Heart size={16} />
                               <MessageSquare size={16} />
                               <Share2 size={16} />
                            </div>
                         </div>
                      ))}
                   </div>
                ) : (
                   /* Generic App UI (Fintech/DeFi style) */
                   <div className="space-y-4">
                      <div className="rounded-xl p-5 text-white shadow-lg border border-slate-700" style={{ background: `linear-gradient(135deg, ${config.color}20, ${config.color}05)` }}>
                         <div className="opacity-80 text-xs mb-1">Total Balance</div>
                         <div className="text-2xl font-bold" style={{ color: config.color }}>$12,450.00</div>
                         <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-white/10 py-2 rounded text-xs font-medium backdrop-blur-sm border border-white/10">Add Funds</button>
                            <button className="flex-1 bg-white/10 py-2 rounded text-xs font-medium backdrop-blur-sm border border-white/10">Transfer</button>
                         </div>
                      </div>
                      <h4 className="font-bold text-white mt-2">Recent Activity</h4>
                      {[1,2,3,4].map(i => (
                         <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.color }}></div>
                               </div>
                               <div>
                                  <div className="text-sm font-semibold text-white">Transaction {i}</div>
                                  <div className="text-[10px] text-slate-500">Today, 12:00 PM</div>
                               </div>
                            </div>
                            <div className="text-sm font-bold text-white">-$24.00</div>
                         </div>
                      ))}
                   </div>
                )}
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 w-full h-16 bg-slate-950 border-t border-slate-800 flex justify-around items-center pb-2 z-10 rounded-b-3xl">
                 <div className="flex flex-col items-center gap-1">
                    <Home size={20} style={{ color: config.color }} />
                 </div>
                 <div className="flex flex-col items-center gap-1 text-slate-600">
                    <Search size={20} />
                 </div>
                 <div className="flex flex-col items-center gap-1 text-slate-600">
                    <User size={20} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- Desktop Web View ---
  return (
    <div className="w-full h-full bg-slate-950 flex flex-col overflow-y-auto font-sans text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 sticky top-0 bg-slate-950/90 backdrop-blur z-10 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 font-bold" style={{ backgroundColor: config.color }}>
            {config.name.substring(0, 1)}
          </div>
          {config.name}
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Customers</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button 
          className="px-4 py-2 rounded-md text-slate-900 font-bold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: config.color }}
        >
          {config.industry === 'Dating' ? 'Join Now' : 'Get Started'}
        </button>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 relative">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{ backgroundColor: config.color }}></div>
        </div>

        <div className="relative z-10">
          <span 
            className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6 inline-block border"
            style={{ color: config.color, borderColor: `${config.color}50`, backgroundColor: `${config.color}10` }}
          >
            {config.industry} Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl">
            {config.industry === 'Dating' ? (
               <>Find your <span style={{ color: config.color }}>Perfect Match</span> today.</>
            ) : config.industry === 'Social Network' ? (
               <>Connect with <span style={{ color: config.color }}>Friends</span> like never before.</>
            ) : config.industry === 'DeFi' || config.industry === 'Web3' ? (
               <>The Future of <span style={{ color: config.color }}>Decentralized Finance</span></>
            ) : (
               <>The Future of <span style={{ color: config.color }}>{config.industry}</span> is Here.</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed mt-4">
            {config.description || (
               config.industry === 'Dating' 
                 ? `Join ${config.name}, the most trusted dating platform. Real connections, real people.`
                 : config.industry === 'DeFi' || config.industry === 'Web3'
                 ? `${config.name} provides enterprise-grade blockchain infrastructure for the next generation of finance.`
                 : `Empower your ${config.industry.toLowerCase()} business with ${config.name}'s cutting-edge platform.`
            )}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              className="px-8 py-3 rounded-lg text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{ backgroundColor: config.color }}
            >
              {config.industry === 'Dating' ? 'View Profiles' : config.industry === 'DeFi' ? 'Launch App' : 'Start Free Trial'}
            </button>
            <button className="px-8 py-3 rounded-lg bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm hover:bg-slate-700 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-slate-900/50 py-12 border-t border-slate-800">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
        <div className="flex justify-center gap-8 md:gap-16 opacity-30">
           {/* Mock Logos */}
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="h-8 w-24 bg-slate-600 rounded"></div>
           ))}
        </div>
      </div>
    </div>
  );
};

// 2. Software Template (Terminal/Installer)
const SoftwareTemplate = ({ config }: { config: ConfigType }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0); // 0: install, 1: config, 2: success

  useEffect(() => {
    if (step > 0) return;

    const lines = [
      `> initializing ${config.name.toLowerCase()}-cli v2.0.4...`,
      `> connecting to ${config.industry.toLowerCase()} registry...`,
      `> fetching dependencies...`,
      `> verifying signatures...`,
      `> extracting core modules...`,
      `> optimizing build for production...`,
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setLogs(prev => [...prev, lines[currentLine]]);
        setProgress(prev => Math.min(prev + 15, 90));
        currentLine++;
      } else {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setStep(1), 800);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [step, config.name, config.industry]);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full h-full bg-slate-950 text-slate-200 font-mono flex flex-col p-8 overflow-hidden">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
        {/* Window Chrome */}
        <div className="bg-slate-900 rounded-t-lg p-3 flex items-center gap-2 border-b border-slate-800">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <div className="ml-4 text-xs text-slate-500">Terminal — {config.name.toLowerCase()} install</div>
        </div>

        {/* Content */}
        <div className="bg-slate-950 flex-1 rounded-b-lg p-6 overflow-y-auto border border-t-0 border-slate-800 shadow-2xl relative">

          {step === 0 && (
            <div className="space-y-2">
              <div className="mb-4 font-bold" style={{ color: config.color }}>$ npm install -g @{config.name.toLowerCase()}/core</div>
              {logs.map((log, i) => (
                <div key={i} className="opacity-80 border-l-2 pl-3 border-slate-700">
                  {log}
                </div>
              ))}
              <div className="mt-6 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%`, backgroundColor: config.color }}
                ></div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full border-4 border-dashed animate-spin mb-6" style={{ borderColor: config.color }}></div>
              <h3 className="text-xl font-semibold text-white">Configuring Environment</h3>
              <p className="text-slate-500 mt-2">Setting up your {config.industry} workspace...</p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
                <Check size={40} strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Installation Complete</h2>
              <p className="text-slate-400 max-w-md mb-8">
                {config.name} is now ready. Run <span className="px-2 py-0.5 rounded" style={{ backgroundColor: `${config.color}20`, color: config.color }}>{config.name.toLowerCase()} start</span> to launch the daemon.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <button className="py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700">Open Documentation</button>
                <button 
                  className="py-3 rounded-lg text-slate-900 text-sm font-bold shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: config.color }}
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. AI Template
const AITemplate = ({ config }: { config: ConfigType }) => {
  return (
    <div className="w-full h-full flex bg-slate-950 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 font-bold text-white flex items-center gap-2">
          <Bot size={20} style={{ color: config.color }} />
          {config.name} AI
        </div>
        <div className="p-4 space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">History</div>
            <div className="space-y-1">
              <div className="px-3 py-2 rounded text-sm text-white cursor-pointer" style={{ backgroundColor: `${config.color}20` }}>Project Alpha Analysis</div>
              <div className="px-3 py-2 hover:bg-slate-800 rounded text-sm cursor-pointer transition-colors">Q3 Financials</div>
              <div className="px-3 py-2 hover:bg-slate-800 rounded text-sm cursor-pointer transition-colors">Competitor Report</div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full" style={{ background: `linear-gradient(135deg, ${config.color}, #9D4EDD)` }}></div>
            <div className="text-sm">
              <div className="font-medium text-white">Admin User</div>
              <div className="text-xs text-slate-500">Pro Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        <header className="h-14 border-b border-slate-800 flex items-center px-6 justify-between">
          <div className="font-semibold text-white">New Session</div>
          <div className="flex gap-3">
             <span className="px-2 py-1 text-xs rounded font-medium border" style={{ backgroundColor: `${config.color}20`, color: config.color, borderColor: `${config.color}50` }}>Demo Mode</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-slate-800 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-lg text-sm shadow-sm border border-slate-700">
              Analyze the current market trends for our {config.industry} product launch and draft an email to stakeholders.
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4 max-w-3xl">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-slate-900 shadow-md font-bold" style={{ backgroundColor: config.color }}>
              <Bot size={16} />
            </div>
            <div className="space-y-4 w-full">
              <div className="bg-slate-900 border border-slate-800 text-slate-300 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm text-sm leading-relaxed">
                <p className="mb-3">I&apos;ve analyzed the latest data for <strong className="text-white">{config.name}</strong>. Here are the key insights for the {config.industry} sector:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-400">
                   <li>Demand for automated solutions has risen by <strong className="text-white">24%</strong> YoY.</li>
                   <li>Competitors are pivoting towards privacy-first architectures.</li>
                </ul>
                <p>I&apos;ve drafted the email below based on these findings.</p>
              </div>

              {/* Artifact / Card */}
              <div className="border border-slate-800 rounded-xl bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Inbox size={14} />
                  Draft: Stakeholder Update
                </div>
                <div className="p-4">
                  <div className="text-sm text-slate-500 mb-2">Subject: Q1 Launch Strategy - {config.name}</div>
                  <div className="text-sm text-slate-300 font-mono bg-slate-950 p-3 rounded border border-slate-800">
                    Team,<br/><br/>
                    Based on our latest analysis, we are positioned to capture significant market share in the {config.industry} vertical.<br/><br/>
                    Key differentiator: Our new AI-driven engine.<br/>
                    Action: Review the attached roadmap.
                  </div>
                  <div className="mt-3 flex gap-2">
                     <button className="px-3 py-1.5 rounded text-xs font-medium text-slate-900" style={{ backgroundColor: config.color }}>Copy to Clipboard</button>
                     <button className="px-3 py-1.5 rounded text-xs font-medium border border-slate-700 hover:bg-slate-800 text-slate-400">Regenerate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-800">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask anything..." 
              className="w-full pl-4 pr-12 py-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:outline-none transition-shadow"
              style={{ outlineColor: config.color }}
            />
            <button 
              className="absolute right-2 top-2 p-1.5 rounded-md text-slate-900 transition-opacity hover:opacity-90"
              style={{ backgroundColor: config.color }}
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="text-center mt-2 text-xs text-slate-500">
            {config.name} AI can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Hardware Template (SVG Concept)
const HardwareTemplate = ({ config }: { config: ConfigType }) => {
  return (
    <div className="w-full h-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full">
         <div className="absolute top-10 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30" style={{ backgroundColor: config.color }}></div>
         <div className="absolute bottom-10 right-10 w-64 h-64 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        {/* The Device Mockup */}
        <div className="relative w-[600px] h-[360px] transition-transform hover:scale-105 duration-700 ease-out">

            {/* Device Body / Shadow */}
            <div className="absolute -bottom-10 left-10 right-10 h-10 blur-xl rounded-full" style={{ backgroundColor: `${config.color}30` }}></div>

            {/* Main Chassis */}
            <svg viewBox="0 0 600 360" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="reflect" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Bezel / Frame */}
              <rect x="20" y="20" width="560" height="320" rx="20" fill="#1e293b" />
              <rect x="25" y="25" width="550" height="310" rx="16" fill="url(#screenGrad)" />

              {/* Screen Content */}
              <g transform="translate(60, 80)">
                 {/* Header */}
                 <text x="0" y="0" fill="white" fontSize="24" fontFamily="sans-serif" fontWeight="bold">Hello.</text>
                 <text x="0" y="30" fill="#64748b" fontSize="14" fontFamily="sans-serif">System Ready</text>

                 {/* Dynamic Branding "Laser Etched" */}
                 <text x="440" y="220" textAnchor="end" fill="white" opacity="0.1" fontSize="40" fontWeight="bold" fontFamily="sans-serif" style={{ textTransform: 'uppercase' }}>
                    {config.name}
                 </text>

                 {/* Status Indicator */}
                 <circle cx="0" cy="180" r="4" fill={config.color} />
                 <text x="15" y="184" fill={config.color} fontSize="12" fontFamily="sans-serif">Connected to {config.industry} Hub</text>

                 {/* Graph Visual */}
                 <path d="M0 120 Q 50 80, 100 110 T 200 90 T 300 130" fill="none" stroke={config.color} strokeWidth="2" strokeOpacity="0.6" />
                 <path d="M0 120 L 300 120" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
              </g>

              {/* Screen Glare */}
              <path d="M25 25 L 575 25 L 450 335 L 25 335 Z" fill="url(#reflect)" opacity="0.3" style={{ mixBlendMode: 'overlay' }} />
            </svg>

            {/* Physical Button */}
            <div className="absolute -right-1 top-20 w-1 h-12 bg-slate-700 rounded-r-md shadow-sm"></div>
        </div>

        {/* Marketing Copy */}
        <div className="mt-12 text-center">
           <h2 className="text-3xl font-bold text-white">{config.name} Pro</h2>
           <p className="text-slate-500 mt-2">The ultimate hardware for {config.industry}.</p>
           <div className="mt-6 flex justify-center gap-4">
             <div className="flex flex-col items-center px-4 border-r border-slate-700">
                <span className="font-bold text-white">5G</span>
                <span className="text-xs text-slate-500">Connectivity</span>
             </div>
             <div className="flex flex-col items-center px-4 border-r border-slate-700">
                <span className="font-bold text-white">24h</span>
                <span className="text-xs text-slate-500">Battery</span>
             </div>
             <div className="flex flex-col items-center px-4">
                <span className="font-bold" style={{ color: config.color }}>AI</span>
                <span className="text-xs text-slate-500">Powered</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Application ---

export default function ProductPreviewWizard() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState<ConfigType>({
    category: '',
    name: '',
    color: COLORS[0].hex,
    industry: '',
    description: '',
    platform: 'Web'
  });

  const handleCategorySelect = (id: string) => {
    setConfig(prev => ({ ...prev, category: id, platform: id === 'website' ? 'Web' : '' }));
    setStep(2);
  };

  const handleGenerate = () => {
    if (!config.name || !config.industry) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 1500);
  };

  const renderPreview = () => {
    switch (config.category) {
      case 'website': return <WebsiteTemplate config={config} />;
      case 'software': return <SoftwareTemplate config={config} />;
      case 'ai': return <AITemplate config={config} />;
      case 'hardware': return <HardwareTemplate config={config} />;
      default: return null;
    }
  };

  const getStepTitle = () => {
    if (step === 1) return "Choose your product type";
    if (step === 2) return "Personalize the brand";
    if (step === 3) return "Your Generated Preview";
    return "";
  };

  return (
    <div className="min-h-screen bg-swarp-darker font-sans text-white flex flex-col">

      {/* Header */}
      <header className="px-6 py-4 bg-swarp-dark border-b border-swarp-blue/20 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-8 h-8 bg-gradient-to-br from-swarp-blue to-swarp-purple text-white rounded-lg flex items-center justify-center">
            <Layout size={18} />
          </div>
          Swarp<span className="text-swarp-cyan">Labs</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : ''}`}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${step >= 1 ? 'border-swarp-cyan bg-swarp-cyan/20 text-swarp-cyan' : 'border-slate-600'}`}>1</span>
            <span className="hidden sm:inline">Type</span>
          </div>
          <div className="w-8 h-px bg-slate-700"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : ''}`}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${step >= 2 ? 'border-swarp-cyan bg-swarp-cyan/20 text-swarp-cyan' : 'border-slate-600'}`}>2</span>
            <span className="hidden sm:inline">Details</span>
          </div>
          <div className="w-8 h-px bg-slate-700"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-white' : ''}`}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${step >= 3 ? 'border-swarp-cyan bg-swarp-cyan/20 text-swarp-cyan' : 'border-slate-600'}`}>3</span>
            <span className="hidden sm:inline">Result</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2 text-gradient">{getStepTitle()}</h1>
          <p className="text-slate-400">
            {step === 1 && "Select a template category to start building your deliverable."}
            {step === 2 && "Enter a few details to magically generate your preview."}
            {step === 3 && "Interactive preview ready. Share or download below."}
          </p>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="group relative flex flex-col items-center p-8 bg-swarp-dark border border-swarp-blue/20 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-swarp-blue/10 hover:-translate-y-1 hover:border-swarp-cyan/50 transition-all text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-swarp-blue/10 group-hover:bg-swarp-cyan/20 text-slate-400 group-hover:text-swarp-cyan flex items-center justify-center mb-6 transition-colors border border-swarp-blue/20">
                  <cat.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cat.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity text-swarp-cyan text-sm font-semibold flex items-center gap-1">
                  Select <ArrowRight size={14} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Personalization Form */}
        {step === 2 && (
          <div className="max-w-xl mx-auto w-full bg-swarp-dark p-8 rounded-2xl shadow-sm border border-swarp-blue/20">
            <div className="space-y-6">

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company / Product Name</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="e.g., NexusCore"
                  className="w-full px-4 py-3 rounded-lg border border-swarp-blue/20 bg-swarp-darker text-white placeholder-slate-500 focus:ring-2 focus:ring-swarp-cyan focus:border-swarp-cyan focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Platform Selection (Only for Website & Apps) */}
              {config.category === 'website' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Web', 'Mobile App'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => setConfig({ ...config, platform })}
                        className={`py-2 px-4 rounded-lg border font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                           config.platform === platform 
                             ? 'bg-swarp-cyan text-swarp-darker border-swarp-cyan shadow-md' 
                             : 'bg-swarp-darker text-slate-400 border-swarp-blue/20 hover:border-swarp-cyan/50'
                        }`}
                      >
                         {platform === 'Web' ? <Globe size={16} /> : <Smartphone size={16} />}
                         {platform}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Industry Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Industry / Niche</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setConfig({ ...config, industry: ind })}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        config.industry === ind 
                          ? 'bg-swarp-cyan text-swarp-darker border-swarp-cyan' 
                          : 'bg-swarp-darker text-slate-400 border-swarp-blue/20 hover:border-swarp-cyan/50'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Color */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Primary Color</label>
                <div className="flex gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setConfig({ ...config, color: c.hex })}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                         config.color === c.hex ? 'ring-2 ring-offset-2 ring-offset-swarp-dark ring-white' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {config.color === c.hex && <Check size={16} className="text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Description */}
              <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">Short Description (Optional)</label>
                 <textarea 
                    value={config.description}
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    placeholder="We sell AI-powered coffee machines..."
                    className="w-full px-4 py-3 rounded-lg border border-swarp-blue/20 bg-swarp-darker text-white placeholder-slate-500 focus:ring-2 focus:ring-swarp-cyan focus:outline-none text-sm h-24 resize-none"
                 />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-lg border border-swarp-blue/20 font-medium text-slate-400 hover:bg-swarp-blue/10 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Categories
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!config.name || !config.industry || isGenerating}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-swarp-blue to-swarp-purple text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Generating Assets...
                    </>
                  ) : (
                    <>Generate Preview <Play size={16} fill="currentColor" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && (
          <div className="flex-1 flex flex-col gap-6">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-swarp-dark p-4 rounded-xl border border-swarp-blue/20 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="text-sm font-medium text-slate-500 hidden sm:block">Category:</div>
                <div className="px-3 py-1 bg-swarp-blue/10 rounded-md text-sm font-semibold flex items-center gap-2 whitespace-nowrap text-swarp-cyan border border-swarp-blue/20">
                   {(() => {
                      const CatIcon = CATEGORIES.find(c => c.id === config.category)?.icon || Layout;
                      return <CatIcon size={14} />;
                   })()}
                   {CATEGORIES.find(c => c.id === config.category)?.label}
                </div>
                <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>
                <div className="flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }}></div>
                  <span className="font-medium text-white truncate max-w-[100px] sm:max-w-xs">{config.name}</span>
                  {config.platform && config.platform !== 'Web' && (
                     <span className="text-xs bg-swarp-blue/10 px-2 py-0.5 rounded text-swarp-cyan border border-swarp-blue/20">{config.platform}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <button 
                   onClick={() => setStep(2)} 
                   className="px-3 py-2 rounded-lg border border-swarp-blue/20 hover:bg-swarp-blue/10 text-slate-400 text-sm font-medium flex items-center justify-center gap-2"
                >
                   <ArrowLeft size={16} /> Edit
                </button>
                <button 
                   onClick={() => setStep(1)} 
                   className="px-3 py-2 rounded-lg border border-swarp-blue/20 hover:bg-swarp-blue/10 text-slate-400 text-sm font-medium flex items-center justify-center gap-2"
                >
                   <Layout size={16} /> Templates
                </button>

                <div className="w-px bg-slate-700 mx-1 hidden sm:block"></div>

                <button className="px-3 py-2 rounded-lg border border-swarp-blue/20 hover:bg-swarp-blue/10 text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
                  <Share2 size={16} />
                </button>
                <button 
                  className="px-3 py-2 rounded-lg text-swarp-darker text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow glow-cyan"
                  style={{ backgroundColor: config.color }}
                >
                  <Download size={16} /> Export
                </button>
              </div>
            </div>

            {/* The Preview Window */}
            <div className="flex-1 bg-swarp-dark rounded-xl border border-swarp-blue/20 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
              {/* Fake Browser Chrome */}
              <div className="bg-swarp-darker border-b border-swarp-blue/20 px-4 py-2 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="flex-1 bg-swarp-dark h-7 rounded-md border border-swarp-blue/20 flex items-center px-3 text-xs text-slate-500 font-mono">
                  {config.category === 'software' ? 'localhost:3000' : `https://${config.name.toLowerCase().replace(/\s+/g, '')}.com`}
                </div>
              </div>

              {/* Actual Template Render */}
              <div className="flex-1 relative overflow-hidden">
                {renderPreview()}
              </div>

              {/* Lead Capture Overlay */}
              <div className="absolute bottom-6 right-6 bg-swarp-dark text-white p-4 rounded-xl shadow-2xl max-w-xs z-50 border border-swarp-blue/20 glow-blue">
                <div className="flex items-start gap-3">
                   <div className="mt-1 p-1.5 rounded-lg" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
                      <ShieldCheck size={16} />
                   </div>
                   <div>
                     <h4 className="font-bold text-sm">Preview Ready</h4>
                     <p className="text-xs text-slate-400 mt-1 mb-3">Generated based on {config.industry} best practices by Swarp Foundation.</p>
                     <button 
                       className="w-full py-2 rounded text-xs font-bold hover:opacity-90 transition-colors text-swarp-darker"
                       style={{ backgroundColor: config.color }}
                     >
                       Request Full Quote
                     </button>
                   </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}