import "express";

import type { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      authId?: string;
    }
  }
}

export {};
