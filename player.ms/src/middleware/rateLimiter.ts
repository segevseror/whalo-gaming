import { Request, Response, NextFunction } from "express";

type Bucket = {
  tokens: number;
  lastRefill: number;
};

const MAX_TOKENS = 10; // max tokens per bucket
const REFILL_RATE = 1; // tokens per second
const REFILL_TIME = 1000; // second

const buckets: Record<string, Bucket> = {};

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip: any = req.ip || req.headers["x-forwarded-for"] || "unknown";
  // This is a simple way to get the IP address, but in production, you might want to use a more robust method.
  const now = Date.now();
  const bucket = buckets[ip] || {
    tokens: MAX_TOKENS,
    lastRefill: now,
  };

  // Calculate elapsed time
  const elapsed = (now - bucket.lastRefill) / REFILL_TIME; // in seconds
  const refill = Math.floor(elapsed * REFILL_RATE);
  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + refill);
  bucket.lastRefill = now;
  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    buckets[ip] = bucket;
    next();
  } else {
    res
      .status(429)
      .json({ message: "Too Many Requests. Please try again later." });
  }
}
