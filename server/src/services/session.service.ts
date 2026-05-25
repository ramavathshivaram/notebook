import redis from "#configs/redis.js";
import ApiError from "#utils/ApiError.js";

import type { ITokenPayload } from "../types/type.js";

const SESSION_TTL = 60 * 60 * 24;

interface SessionData {
  tokenVersion: number;
}

const getSessionKey = (authId: ITokenPayload["authId"]): string =>
  `session:${authId}`;

const serialize = (data: SessionData) => JSON.stringify(data);

const deserialize = (data: string): SessionData | null => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const setSession = async (
  authId: ITokenPayload["authId"],
  tokenVersion: ITokenPayload["tokenVersion"],
) => {
  return redis.set(
    getSessionKey(authId),

    serialize({
      tokenVersion,
    }),

    "EX",
    SESSION_TTL,
  );
};

export const getSession = async (
  authId: ITokenPayload["authId"],
): Promise<SessionData | null> => {
  const session = await redis.get(getSessionKey(authId));

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  return deserialize(session);
};

export const deleteSession = async (authId: ITokenPayload["authId"]) => {
  return redis.del(getSessionKey(authId));
};

export const rotateSession = async (authId: ITokenPayload["authId"]) => {
  return redis.expire(getSessionKey(authId), SESSION_TTL);
};
