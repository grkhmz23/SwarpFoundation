/**
 * Swarp AI Configuration
 * 
 * Supports multiple LLM providers with automatic fallback:
 * 1. OpenRouter - Best variety, free tier available (Qwen, Llama, Mistral)
 * 2. Groq - Fastest inference, generous free tier (14,400 req/day)
 * 3. Together AI - Good for Llama 4, $25 free credits
 * 
 * @see SWARP_AI_SETUP.md for detailed setup instructions
 */

export type AIProvider = 'openrouter' | 'groq' | 'together';

export interface ProviderConfig {
  name: string;
  baseUrl: string;
  apiKeyEnv: string;
  description: string;
  freeTier: string;
  bestFor: string[];
}

export const PROVIDER_CONFIGS: Record<AIProvider, ProviderConfig> = {
  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKeyEnv: 'OPENROUTER_API_KEY',
    description: 'Unified API for 100+ models including free Qwen and Llama',
    freeTier: '50 requests/day (1,000 with $10 topup)',
    bestFor: ['Model variety', 'Qwen access', 'No credit card needed'],
  },
  groq: {
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    apiKeyEnv: 'GROQ_API_KEY',
    description: 'Fastest inference with custom LPU hardware',
    freeTier: '14,400 requests/day, 70K tokens/min',
    bestFor: ['Speed', 'High volume', 'Real-time apps'],
  },
  together: {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    apiKeyEnv: 'TOGETHER_API_KEY',
    description: 'Open-source model inference with free credits',
    freeTier: '$25 free credits',
    bestFor: ['Llama 4 access', 'Fine-tuning', 'Research'],
  },
};

// Free tier models available on each provider
export const FREE_MODELS = {
  openrouter: [
    { id: 'qwen/qwen3-coder:free', name: 'Qwen 3 Coder', description: 'Best for coding tasks', context: '128K' },
    { id: 'qwen/qwen2.5-72b-instruct:free', name: 'Qwen 2.5 72B', description: 'General conversation', context: '128K' },
    { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B', description: 'Fast, general purpose', context: '128K' },
    { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', description: 'European model', context: '32K' },
    { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', description: 'Multimodal, fast', context: '1M' },
  ],
  groq: [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Most capable', context: '128K' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', description: 'Fast responses', context: '128K' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: 'Good reasoning', context: '32K' },
  ],
  together: [
    { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo', description: 'Efficient', context: '128K' },
    { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B Turbo', description: 'High quality', context: '128K' },
  ],
};

/**
 * Get the currently configured provider
 */
export function getCurrentProvider(): AIProvider {
  return (process.env.SWARP_AI_PROVIDER as AIProvider) || 'openrouter';
}

/**
 * Get the currently configured model
 */
export function getCurrentModel(): string {
  const provider = getCurrentProvider();
  const defaultModels: Record<AIProvider, string> = {
    openrouter: 'qwen/qwen3-coder:free',
    groq: 'llama-3.3-70b-versatile',
    together: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
  };
  return process.env.SWARP_AI_MODEL || defaultModels[provider];
}

/**
 * Check if the current provider is properly configured
 */
export function isProviderConfigured(provider: AIProvider): boolean {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) return false;
  
  const apiKey = process.env[config.apiKeyEnv];
  return Boolean(apiKey && apiKey.trim().length > 0);
}

/**
 * Get provider status for all providers
 */
export function getProviderStatus(): Array<{
  provider: AIProvider;
  name: string;
  configured: boolean;
  current: boolean;
  freeTier: string;
}> {
  const current = getCurrentProvider();
  
  return (Object.keys(PROVIDER_CONFIGS) as AIProvider[]).map((key) => ({
    provider: key,
    name: PROVIDER_CONFIGS[key].name,
    configured: isProviderConfigured(key),
    current: key === current,
    freeTier: PROVIDER_CONFIGS[key].freeTier,
  }));
}

/**
 * Validate AI configuration
 * Returns null if valid, error message if invalid
 */
export function validateAIConfig(): string | null {
  const provider = getCurrentProvider();
  const config = PROVIDER_CONFIGS[provider];
  
  if (!config) {
    return `Invalid SWARP_AI_PROVIDER: ${provider}. Must be one of: ${Object.keys(PROVIDER_CONFIGS).join(', ')}`;
  }
  
  if (!isProviderConfigured(provider)) {
    return `Provider ${config.name} is not configured. Please set ${config.apiKeyEnv} environment variable.`;
  }
  
  return null;
}

/**
 * Get available models for the current provider
 */
export function getAvailableModels(provider?: AIProvider) {
  const p = provider || getCurrentProvider();
  return FREE_MODELS[p] || [];
}

/**
 * Get recommended model based on use case
 */
export function getRecommendedModel(useCase: 'coding' | 'chat' | 'fast'): string {
  const provider = getCurrentProvider();
  const models = FREE_MODELS[provider];
  
  if (!models || models.length === 0) {
    return getCurrentModel();
  }
  
  switch (useCase) {
    case 'coding':
      // Prefer Qwen Coder or Llama 70B
      return models.find(m => m.id.includes('coder'))?.id 
        || models.find(m => m.id.includes('70b'))?.id 
        || models[0].id;
    case 'fast':
      // Prefer smaller models (8B)
      return models.find(m => m.id.includes('8b'))?.id || models[0].id;
    case 'chat':
    default:
      // Prefer larger models or first available
      return models.find(m => m.id.includes('70b'))?.id 
        || models.find(m => m.id.includes('72b'))?.id 
        || models[0].id;
  }
}
