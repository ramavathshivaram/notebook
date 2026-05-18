import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

import ApiError from "#utils/ApiError.js";
import { hashPassword, isPasswordMatched } from "#services/password.service.js";

import authRepository from "../auth.repository.js";
import setAuthCookiesAndRespond from "#services/setAuthCookiesAndRespond.service.js";

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  userName: string;
  email: string;
  password: string;
}

const login = asyncHandler(
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    const authResponse = await authRepository.getUserWithPasswordByEmail(email);

    await isPasswordMatched(password, authResponse.password);

    return await setAuthCookiesAndRespond(
      res,
      authResponse,
      "Login successful",
    );
  },
);

const register = asyncHandler(
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { userName, email, password } = req.body;

    const userExists: Boolean = await authRepository.checkAuthExists({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword: string = await hashPassword(password);

    const authResponse = await authRepository.createAuth({
      email,
      password: hashedPassword,
      userName,
    });

    console.log(authResponse);

    return await setAuthCookiesAndRespond(
      res,
      authResponse,
      "Registration successful",
      201,
    );
  },
);

export default {
  login,
  register,
};
