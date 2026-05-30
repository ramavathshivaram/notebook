import { setCookie } from "./cookie.service.js";
import { generateTokens } from "./token.service.js";
import { setSession } from "./session.service.js";
import type { Response } from "express";
import { REFRESH_TOKEN_EXPIRES_IN } from "#utils/const.js";

const setAuthCookiesAndRespond = async (
  res: Response,
  authResponse: any,
  msg: string,
  statusCode = 200,
) => {
  const { accessToken, refreshToken } = generateTokens(
    authResponse._id,
    authResponse.tokenVersion,
  );

  await setSession(authResponse._id, authResponse.tokenVersion);

  setCookie(res, "refreshToken", refreshToken, {
    maxAge: REFRESH_TOKEN_EXPIRES_IN,
  });

  res.status(statusCode).json({
    message: msg,
    success: true,
    user: {
      userName: authResponse.userName,
      email: authResponse.email,
    },
    token: accessToken,
  });
};

export default setAuthCookiesAndRespond;
