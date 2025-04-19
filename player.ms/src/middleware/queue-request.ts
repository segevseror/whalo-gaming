import { Request, Response, NextFunction } from "express";

type QueuedRequest = {
  req: Request;
  res: Response;
  next: NextFunction;
};

const queue: QueuedRequest[] = [];
const MAX_QUEUE_SIZE = 200; // max overflow capacity
const PROCESS_INTERVAL_MS = 200; // process one request every 200ms

setInterval(() => {
  if (queue.length > 0) {
    const { req, res, next } = queue.shift()!;
    next();
  }
}, PROCESS_INTERVAL_MS);

export function leakyBucketLimiter(req: Request, res: Response, next: NextFunction) {
  if (queue.length >= MAX_QUEUE_SIZE) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }
  queue.push({ req, res, next });
}
