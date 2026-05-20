interface QueueConst {
  SEND_EMAIL: string;
  SECTION: string;
  PAGE: string;
}

export const queueConst: QueueConst = {
  SEND_EMAIL: "SEND_EMAIL",
  SECTION: "SECTION",

  PAGE: "PAGE",
};

export const COOKIE_EXPIRES_IN: number = 24 * 60 * 60 * 1000;

export const ACCESS_TOKEN_EXPIRES_IN: number = 15 * 60;
export const REFRESH_TOKEN_EXPIRES_IN: number = 7 * 24 * 60 * 60;

export const OTP_EXPIRES_IN: number = 15 * 60 * 1000;

export const SESSION_TTL: number = 24 * 60 * 60;

export const DEFAULT_TTL = 60 * 60 * 1000;
