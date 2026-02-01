// src/components/services/service-previews.tsx
"use client";

export function PlatformPreview() {
  return (
    <div className="p-8 h-full flex gap-8 items-center justify-center">
      <div className="w-60 h-96 border-2 border-swarp-cyan/30 rounded-3xl relative overflow-hidden bg-black">
        <div className="absolute top-0 w-full h-6 bg-swarp-dark z-10"></div>
        <div className="p-4 pt-10 space-y-3">
          <div className="h-32 bg-swarp-cyan/10 rounded-lg animate-pulse"></div>
          <div className="h-10 bg-swarp-cyan/10 rounded"></div>
          <div className="h-10 bg-swarp-cyan/10 rounded"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-xs text-swarp-cyan font-mono uppercase">Feature Builder</div>
        {['Auth & SSO', 'Push Notifications', 'Dark Mode', 'Payments'].map(f => (
          <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" defaultChecked className="accent-swarp-cyan" />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TerminalPreview() {
  return (
    <div className="p-6 font-mono text-sm h-full">
      <div className="flex gap-3 mb-4 border-b border-swarp-cyan/20 pb-4">
        <button className="px-3 py-1 bg-swarp-cyan/10 border border-swarp-cyan/30 rounded text-swarp-cyan text-xs">Build Release</button>
        <button className="px-3 py-1 border border-swarp-cyan/20 rounded text-gray-400 text-xs">Run Tests</button>
      </div>
      <div className="space-y-1 text-gray-400">
        <div>$ swarp-cli init --config production.toml</div>
        <div className="text-green-400">&gt; Environment validation passed.</div>
        <div className="text-swarp-cyan">&gt; Compiling release build...</div>
        <div>$ _<span className="inline-block w-2 h-4 bg-swarp-cyan ml-1 animate-pulse"></span></div>
      </div>
    </div>
  );
}

export function AIPreview() {
  return (
    <div className="grid grid-cols-[1fr_200px] h-full">
      <div className="border-r border-swarp-cyan/20 p-4 space-y-4">
        <div className="bg-swarp-dark/50 p-3 rounded-lg rounded-tl-none max-w-xs">
          <p className="text-sm text-gray-300">How can I help you today?</p>
        </div>
        <div className="bg-swarp-cyan/10 p-3 rounded-lg rounded-tr-none max-w-xs ml-auto">
          <p className="text-sm text-swarp-cyan">Analyze Q3 sales data</p>
        </div>
      </div>
      <div className="p-4 bg-black/20">
        <div className="text-xs text-swarp-purple uppercase mb-3">RAG Sources</div>
        <div className="space-y-2">
          {['📄 sales_Q3.pdf', '🌐 api/customers', '📧 email_history'].map(s => (
            <div key={s} className="px-2 py-1 border border-swarp-cyan/20 rounded text-xs text-gray-400">{s}</div>
          ))}
        </div>
        <div className="mt-6">
          <div className="text-xs text-green-400 uppercase mb-2">Confidence</div>
          <div className="h-1 w-full bg-swarp-dark rounded">
            <div className="h-full w-[92%] bg-green-400 rounded"></div>
          </div>
          <div className="text-xs text-right mt-1 text-gray-500">92%</div>
        </div>
      </div>
    </div>
  );
}

export function CryptoPreview() {
  return (
    <div className="p-8 h-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-swarp-dark/50 border border-swarp-cyan/20 rounded-lg">
            <div className="text-2xl font-bold text-swarp-cyan">$2.4M</div>
            <div className="text-xs text-gray-500 mt-1">TVL</div>
          </div>
          <div className="p-4 bg-swarp-dark/50 border border-swarp-cyan/20 rounded-lg">
            <div className="text-2xl font-bold text-green-400">1,247</div>
            <div className="text-xs text-gray-500 mt-1">Users</div>
          </div>
          <div className="p-4 bg-swarp-dark/50 border border-swarp-cyan/20 rounded-lg">
            <div className="text-2xl font-bold text-swarp-purple">24h</div>
            <div className="text-xs text-gray-500 mt-1">Volume</div>
          </div>
        </div>
        <div className="p-4 bg-swarp-dark/50 border border-swarp-cyan/20 rounded-lg">
          <div className="text-xs text-gray-500 mb-2">Connected: 0x742d...3f4a</div>
          <button className="w-full py-3 bg-swarp-cyan/10 border border-swarp-cyan/30 rounded text-swarp-cyan font-semibold">Swap Tokens</button>
        </div>
      </div>
    </div>
  );
}

// Add more preview components for other services
export function DefaultPreview({ type }: { type: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 text-swarp-cyan/30">❖</div>
        <h3 className="text-xl font-semibold mb-2">{type.toUpperCase()} Module</h3>
        <p className="font-mono text-sm text-gray-500">Interactive visualization engine</p>
      </div>
    </div>
  );
}