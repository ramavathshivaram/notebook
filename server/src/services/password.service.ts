import ApiError from "#utils/ApiError.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) throw new Error("Password is required");
  return await bcrypt.hash(password, 10);
};

export const isPasswordMatched = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!password || !hashedPassword)
    throw new ApiError(404, "Password and hashedPassword required");

  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) throw new ApiError(401, "Invalid password");
  return isMatch;
};

export const generateRandomPassword = async (): Promise<string> => {
  const randomPassword = crypto.randomBytes(16).toString("hex");
  return hashPassword(randomPassword);
};

export const generateOTP = (): string => crypto.randomBytes(3).toString("hex");
