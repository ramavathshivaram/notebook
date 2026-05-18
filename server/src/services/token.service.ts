import ApiError from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
import env from "#configs/env.js";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "#utils/const.js";
import type { ITokenPayload } from "../types/type.js";

const { sign, verify } = jwt;

export const generateTokens = (
  authId: Pick<ITokenPayload, "authId">,
  tokenVersion: Pick<ITokenPayload, "tokenVersion">,
) => {
  return {
    accessToken: generateAccessToken(authId, tokenVersion),
    refreshToken: generateRefreshToken(authId, tokenVersion),
  };
};

export const generateAccessToken = (
  authId: Pick<ITokenPayload, "authId">,
  tokenVersion: Pick<ITokenPayload, "tokenVersion">,
): string => {
  return sign(
    {
      authId,
      tokenVersion,
      type: "access",
    },
    env.JWT_SECRET_KEY as string,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

export const generateRefreshToken = (
  authId: Pick<ITokenPayload, "authId">,
  tokenVersion: Pick<ITokenPayload, "tokenVersion">,
): string => {
  return sign(
    {
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

export const verifyToken = (token: string): ITokenPayload => {
  if (!token) throw new ApiError(401, "Token not found");

  try {
    const decoded = verify(token, env.JWT_SECRET_KEY);

    if (typeof decoded === "string" || decoded.type !== "access") {
      throw new ApiError(401, "Invalid token");
    }

    return decoded as ITokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};
