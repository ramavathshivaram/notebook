import logger from "#configs/logger.js";
import type { Request, Response, NextFunction } from "express";

const notFoundRoute = (req: Request, res: Response) => {
  logger.warn({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    method: req.method,
    path: req.originalUrl,
  });

  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export default notFoundRoute;
