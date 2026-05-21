import type { NextFunction, Request, Response } from "express";

import type { ZodObject } from "zod";

import ApiError from "#utils/ApiError.js";

const validateRequest = (schema: ZodObject<any>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message || "Validation failed";

      return next(new ApiError(400, message));
    }

    req.body = result.data;

    next();
  };
};

export default validateRequest;
