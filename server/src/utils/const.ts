interface QueueConst {
  SEND_EMAIL: string;
}

export const queueConst: QueueConst = {
  SEND_EMAIL: "SEND_EMAIL",
};

export const COOKIE_EXPIRES_IN: number = 24 * 60 * 60 * 1000;

export const ACCESS_TOKEN_EXPIRES_IN: number = 15 * 60;
export const REFRESH_TOKEN_EXPIRES_IN: number = 7 * 24 * 60 * 60;

export const OTP_EXPIRES_IN: number = 15 * 60 * 1000;

export const SESSION_TTL: number = 24 * 60 * 60;
