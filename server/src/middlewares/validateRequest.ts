import ApiError from "#utils/ApiError.js";
import type { ZodAny } from "zod";

const validateRequest = (schema: ZodAny) => {
  return (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.errors[0].message;
      return next(new ApiError(400, message));
    }

    req.body = result.data;
    next();
  };
};

export default validateRequest;
