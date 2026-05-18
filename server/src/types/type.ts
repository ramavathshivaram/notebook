import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";

export interface ITokenPayload extends JwtPayload {
  authId: Types.ObjectId;
  tokenVersion: number;
  type: "access" | "refresh";
}
