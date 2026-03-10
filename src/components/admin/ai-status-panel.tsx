'use client';

import { useState, useEffect } from 'react';
import { PROVIDER_CONFIGS, FREE_MODELS, AIProvider } from '@/lib/ai-config';
import { Cpu, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface StatusResponse {
  provider: AIProvider;
  model: string;
  configured: boolean;
  allStatuses: Array<{
    provider: AIProvider;
    name: string;
    configured: boolean;
    current: boolean;
    freeTier: string;
  }>;
  availableModels: Array<{
    id: string;
    name: string;
    description: string;
    context: string;
  }>;
}

export function AIStatusPanel() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  async function fetchStatus() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/admin/api/ai-status');
      if (!res.ok) throw new Error('Failed to fetch status');
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function testConnection() {
    setLoading(true);
    setTestResult(null);
    try {
      const res = await fetch('/swarp-ai/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] }),
      });
      
      if (res.ok) {
        setTestResult({ success: true, message: 'API connection successful! AI is responding.' });
      } else {
        const error = await res.text();
        setTestResult({ success: false, message: `API error: ${res.status} - ${error}` });
      }
    } catch (err) {
      setTestResult({ success: false, message: `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}` });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          <span>Error loading AI status: {error}</span>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-cyan-400" />
        <p className="mt-4 text-slate-300">Loading AI configuration...</p>
      </div>
    );
  }

  const currentConfig = PROVIDER_CONFIGS[status.provider];

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500/20 p-2">
              <Cpu className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Current AI Provider</h3>
              <p className="text-sm text-slate-400">{currentConfig.name}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
            status.configured 
              ? 'bg-emerald-500/20 text-emerald-300' 
              : 'bg-red-500/20 text-red-300'
          }`}>
            {status.configured ? (
              <><CheckCircle className="h-4 w-4" /> Configured</>
            ) : (
              <><XCircle className="h-4 w-4" /> Not Configured</>
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-black/20 p-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Active Model</p>
            <p className="mt-1 font-mono text-sm text-cyan-300">{status.model}</p>
          </div>
          <div className="rounded-lg bg-black/20 p-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Free Tier</p>
            <p className="mt-1 text-sm text-slate-300">{currentConfig.freeTier}</p>
          </div>
        </div>

        {!status.configured && (
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
              <div className="text-sm text-amber-200">
                <p className="font-medium">Configuration Required</p>
                <p className="mt-1">
                  Set <code className="rounded bg-amber-500/20 px-1">{currentConfig.apiKeyEnv}</code> environment variable.
                  See <a href="/SWARP_AI_SETUP.md" className="underline">SWARP_AI_SETUP.md</a> for instructions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Test Connection */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">Test Connection</h4>
            <p className="text-sm text-slate-400">Send a test message to verify the AI is working</p>
          </div>
          <button
            onClick={testConnection}
            disabled={loading || !status.configured}
            className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/30 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test AI'}
          </button>
        </div>
        {testResult && (
          <div className={`mt-3 rounded-lg p-3 text-sm ${
            testResult.success 
              ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-200' 
              : 'border border-red-500/30 bg-red-500/10 text-red-200'
          }`}>
            {testResult.message}
          </div>
        )}
      </div>

      {/* Available Models */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-medium text-white">Available Models</h4>
        <div className="mt-3 space-y-2">
          {status.availableModels.map((model) => (
            <div 
              key={model.id} 
              className={`flex items-center justify-between rounded-lg p-3 ${
                model.id === status.model 
                  ? 'border border-cyan-500/30 bg-cyan-500/10' 
                  : 'bg-black/20'
              }`}
            >
              <div>
                <p className="font-medium text-white">{model.name}</p>
                <p className="text-xs text-slate-400">{model.description}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">
                  {model.context} context
                </span>
                {model.id === status.model && (
                  <span className="ml-2 rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
                    Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Providers */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-medium text-white">All Providers</h4>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="rounded-lg bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:bg-white/10"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="space-y-2">
          {status.allStatuses.map((provider) => (
            <div 
              key={provider.provider}
              className={`flex items-center justify-between rounded-lg p-3 ${
                provider.current 
                  ? 'border border-cyan-500/30 bg-cyan-500/5' 
                  : 'bg-black/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {provider.configured ? (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-slate-500" />
                )}
                <div>
                  <p className="font-medium text-white">{provider.name}</p>
                  <p className="text-xs text-slate-400">{provider.freeTier}</p>
                </div>
              </div>
              {provider.current && (
                <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Environment Setup Guide */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-medium text-white">Environment Variables</h4>
        <div className="mt-3 space-y-2 font-mono text-xs">
          <div className="rounded-lg bg-black/30 p-3">
            <p className="text-slate-500"># Choose provider: openrouter | groq | together</p>
            <p className="text-cyan-300">SWARP_AI_PROVIDER={status.provider}</p>
          </div>
          <div className="rounded-lg bg-black/30 p-3">
            <p className="text-slate-500"># API Key (set this in your deployment platform)</p>
            <p className="text-amber-300">{currentConfig.apiKeyEnv}=sk-...</p>
          </div>
          <div className="rounded-lg bg-black/30 p-3">
            <p className="text-slate-500"># Active Model</p>
            <p className="text-cyan-300">SWARP_AI_MODEL={status.model}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
