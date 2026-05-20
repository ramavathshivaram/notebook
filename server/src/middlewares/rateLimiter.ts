import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";

import asyncHandler from "express-async-handler";

import type { NextFunction, Request, Response } from "express";

import redis from "#configs/redis.js";
import ApiError from "#utils/ApiError.js";

interface LimitOptions {
  keyPrefix: string;
  points: number;
  duration: number;
  blockDuration: number;
}

const insuranceLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

const createLimiter = (options: LimitOptions) =>
  new RateLimiterRedis({
    storeClient: redis,
    insuranceLimiter,
    execEvenly: false,
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
  asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const key =
        req.authId || req.ip || req.headers["x-forwarded-for"] || "anonymous";

      await limiter.consume(String(key));

      next();
    } catch {
      next(new ApiError(429, "Too many requests. Please try again later."));
    }
  });

export default rateLimiterMiddleware;
