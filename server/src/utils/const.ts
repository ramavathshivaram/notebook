interface QueueConst {
  SEND_EMAIL: string;
  SECTION: string;
  PAGE: string;
  MESSAGE: string;
}

export const queueConst: QueueConst = {
  SEND_EMAIL: "SEND_EMAIL",
  SECTION: "SECTION",
  PAGE: "PAGE",
  MESSAGE: "MESSAGE",
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const OTP_EXPIRES_IN = 15 * MINUTE;
export const ACCESS_TOKEN_EXPIRES_IN = HOUR;
export const COOKIE_EXPIRES_IN = DAY;
export const SESSION_TTL = DAY;
export const DEFAULT_TTL = HOUR;
export const REFRESH_TOKEN_EXPIRES_IN = 7 * DAY;