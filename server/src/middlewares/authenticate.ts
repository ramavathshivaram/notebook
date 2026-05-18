import type { NextFunction, Request, Response } from "express";
import ApiError from "#utils/ApiError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "#configs/env.js";

const publicKey = env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n");

interface TokenPayload extends JwtPayload {
  userId: string;
  authId: string;
  tokenVersion: number;
  type: "access" | "refresh";
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(403, "Access token missing or malformed"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(403, "Access token missing"));
  }

  try {
    const decoded = jwt.verify(token, publicKey);

    if (typeof decoded === "string") {
      return next(new ApiError(403, "Invalid token"));
    }

    const payload = decoded as TokenPayload;

    req.authId = payload.authId;
    req.userId = payload.userId;

    next();
  } catch (error) {
    return next(new ApiError(403, "Invalid or expired token"));
  }
};

export default authenticate;
