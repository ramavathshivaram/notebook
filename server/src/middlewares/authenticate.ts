import type { NextFunction, Request, Response } from "express";
import ApiError from "#utils/ApiError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "#configs/env.js";
import type { ITokenPayload } from "../types/type.js";

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
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY as string);

    if (typeof decoded === "string") {
      return next(new ApiError(403, "Invalid token"));
    }

    const payload = decoded as ITokenPayload;

    req.authId = payload.authId;

    next();
  } catch (error) {
    return next(new ApiError(403, "Invalid or expired token"));
  }
};

export default authenticate;
