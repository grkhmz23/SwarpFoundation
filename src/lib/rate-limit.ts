type RateLimitOptions = {
  capacity: number;
  refillPerSecond: number;
  ttlMs?: number;
  maxEntries?: number;
};

type Bucket = {
  tokens: number;
  lastRefillAt: number;
  lastSeenAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSec: number;
};

export type RateLimiter = {
  consume: (key: string) => RateLimitResult;
};

export function createInMemoryRateLimiter(options: RateLimitOptions): RateLimiter {
  const ttlMs = options.ttlMs ?? 10 * 60 * 1000;
  const maxEntries = options.maxEntries ?? 5000;
  const buckets = new Map<string, Bucket>();

  function cleanup(now: number) {
    buckets.forEach((bucket, key) => {
      if (now - bucket.lastSeenAt > ttlMs) {
        buckets.delete(key);
      }
    });
  }

  return {
    consume(key: string): RateLimitResult {
      const now = Date.now();
      const existing = buckets.get(key);
      const bucket: Bucket = existing ?? {
        tokens: options.capacity,
        lastRefillAt: now,
        lastSeenAt: now,
      };

      const elapsedSec = Math.max(0, (now - bucket.lastRefillAt) / 1000);
      bucket.tokens = Math.min(options.capacity, bucket.tokens + elapsedSec * options.refillPerSecond);
      bucket.lastRefillAt = now;
      bucket.lastSeenAt = now;

      if (bucket.tokens < 1) {
        buckets.set(key, bucket);
        const missingTokens = 1 - bucket.tokens;
        const retryAfterSec = Math.max(1, Math.ceil(missingTokens / options.refillPerSecond));
        return { allowed: false, retryAfterSec };
      }

      bucket.tokens -= 1;
      buckets.set(key, bucket);

      if (buckets.size > maxEntries) {
        cleanup(now);
      }

      return { allowed: true, retryAfterSec: 0 };
    },
  };
}

// For multi-instance deployments, use a shared backend (Redis/Upstash) so limits
// are enforced consistently across instances.
