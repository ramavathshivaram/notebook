import redis from "#configs/redis.js";
import type { Types } from "mongoose";

const SESSION_TTL = 60 * 60 * 24; // 1 day

interface SessionData {
  tokenVersion: number;
}

const getSessionKey = (authId: Types.ObjectId) => `session:${authId}`;

const serialize = (data: SessionData) => JSON.stringify(data);

const deserialize = (data: string): SessionData | null => {
  try {
    return JSON.parse(data);
  } catch {
    return null; // prevent crash
  }
};

export const setSession = async (
  authId: Types.ObjectId,
  tokenVersion: number,
) => {
  return redis.set(
    getSessionKey(authId),
    serialize({ tokenVersion }),
    "EX",
    SESSION_TTL,
  );
};

export const getSession = async (
  authId: Types.ObjectId,
): Promise<SessionData | null> => {
  const session = await redis.get(getSessionKey(authId));
  return session ? deserialize(session) : null;
};

export const deleteSession = async (authId: Types.ObjectId) => {
  return redis.del(getSessionKey(authId));
};

export const rotateSession = async (authId: Types.ObjectId) => {
  return redis.expire(getSessionKey(authId), SESSION_TTL);
};
