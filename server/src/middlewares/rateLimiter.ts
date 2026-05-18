import { RateLimiterRedis, RateLimiterMemory } from "rate-limiter-flexible";
import asyncHandler from "express-async-handler";
import redis from "#configs/redis.js";
import ApiError from "#utils/ApiError.js";
import type { NextFunction, Request, Response } from "express";

interface LimitOptions {
  keyPrefix: string;
  points: number;
  duration: number;
  blockDuration: number;
}

const createLimiter = (options: LimitOptions) =>
  new RateLimiterRedis({
    storeClient: redis,
    execEvenly: false,
    insuranceLimiter: new RateLimiterMemory({
      points: 100,
      duration: 60,
    }),
    ...options,
  });

export const authLimiter = createLimiter({
  keyPrefix: "auth",
  points: 100,
  duration: 60,
  blockDuration: 30,
});

export const otpLimiter = createLimiter({
  keyPrefix: "otp",
  points: 5,
  duration: 300,
  blockDuration: 300,
});

export const refreshLimiter = createLimiter({
  keyPrefix: "refresh",
  points: 20,
  duration: 60,
  blockDuration: 60,
});

export const authCheckLimiter = createLimiter({
  keyPrefix: "auth-check",
  points: 60,
  duration: 60,
  blockDuration: 30,
});

export const rateLimiterMiddleware = (limiter: RateLimiterRedis) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const key : string =  req.ip as string;

    try {
      await limiter.consume(key);
      return next();
    } catch (err) {
      return next(new ApiError(429, "Too many requests"));
    }
  });

export default rateLimiterMiddleware;