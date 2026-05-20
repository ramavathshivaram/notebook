import type { NextFunction, Request, Response } from "express";

import type { ZodObject, ZodError } from "zod";

import ApiError from "#utils/ApiError.js";

const validateRequest = (schema: ZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error as ZodError;

      const message = error.errors[0]?.message || "Validation failed";

      return next(new ApiError(400, message));
    }

    req.body = result.data;

    next();
  };
};

export default validateRequest;
