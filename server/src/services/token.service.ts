import ApiError from "#utils/ApiError.js";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import env from "#configs/env.js";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "#utils/const.js";
import type { Types } from "mongoose";

const { sign, verify } = jwt;

interface TokenPayload extends JwtPayload {
  userId: Types.ObjectId;
  authId: Types.ObjectId;
  tokenVersion: number;
  type: "access" | "refresh";
}

export const generateTokens = (
  userId: Types.ObjectId,
  authId: Types.ObjectId,
  tokenVersion: number,
) => {
  return {
    accessToken: generateAccessToken(userId, tokenVersion),
    refreshToken: generateRefreshToken(userId, authId, tokenVersion),
  };
};

export const generateAccessToken = (
  userId: Types.ObjectId,
  tokenVersion: number,
): string => {


  return sign(
    {
      userId,
      tokenVersion,
      type: "access",
    },
    env.JWT_SECRET_KEY as string,
 {

    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  }
  );
};

export const generateRefreshToken = (
  userId: Types.ObjectId,
  authId: Types.ObjectId,
  tokenVersion: number,
): string => {

  return sign(
    {
      userId,
      authId,
      tokenVersion,
      type: "refresh",
    },
    env.JWT_SECRET_KEY as string,
      {

    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  },
  );
};

export const verifyToken = (token: string): TokenPayload => {
  if (!token) throw new ApiError(401, "Token not found");

  try {
    const decoded = verify(token, env.JWT_SECRET_KEY);

    if (typeof decoded === "string" || decoded.type !== "access") {
      throw new ApiError(401, "Invalid token");
    }

    return decoded as TokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};
