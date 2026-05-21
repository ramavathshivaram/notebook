import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import { getCookie, setCookie, clearCookie } from "#services/cookie.service.js";
import {
  getSession,
  setSession,
  deleteSession,
} from "#services/session.service.js";
import { verifyToken, generateTokens } from "#services/token.service.js";
import ApiError from "#utils/ApiError.js";
import type { ITokenPayload } from "../../../types/type.js";
import authRepository from "../auth.repository.js";
import cacheService from "#services/cache.service.js";

const authKey = (authId: string) => `auth-${authId}`;

const refreshTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = getCookie(req, "refreshToken");

    const refreshData: ITokenPayload = verifyToken(refreshToken);

    const { tokenVersion, authId } = refreshData;

    const session = await getSession(authId);

    if (!session) {
      throw new ApiError(404, "Session not found");
    }

    if (tokenVersion !== session.tokenVersion) {
      throw new ApiError(404, "Invalid refresh token");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens(authId, tokenVersion);

    setCookie(res, "refreshToken", newRefreshToken);

    await setSession(authId, session.tokenVersion);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      token: newAccessToken,
    });
  },
);

const logout = asyncHandler(async (req: Request, res: Response) => {
  clearCookie(res, "refreshToken");

  if(!req.authId) {
    throw new ApiError(401, "Unauthorized");
  }

  await deleteSession(req?.authId);

  res.json({
    message: "Logout successful",
    success: true,
  });
});

const authCheck = asyncHandler(async (req: Request, res: Response) => {
  const authResponse = await cacheService.cache(authKey(req.authId), () =>
    authRepository.getAuthById(req.authId),
  );
  res.status(200).json({
    success: true,
    data: authResponse,
  });
});

export default {
  logout,
  authCheck,
  refreshTokenController,
};
