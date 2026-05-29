import env from "#configs/env.js";
import type { Request, Response } from "express";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import health from "#utils/health.js";
import bullBoard from "#configs/bullBoard.js";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import notFoundRoute from "#middlewares/notFoundRoute.js";
import errorHandler from "#middlewares/errorHandler.js";

import authRouter from "#modules/auth/auth.routes.js";
import sectionRouter from "#modules/section/section.route.js";
import authenticate from "#middlewares/authenticate.js";
import pageRouter from "#modules/page/page.route.js";
import canvasRouter from "#modules/canvas/canvas.route.js";
import messageRouter from "#modules/message/message.route.js";
import aiRouter from "#modules/ai/ai.route.js";

const corsOptions = {
  origin: env.ORIGIN,
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//! Middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
    level: 6,
  }),
);

app.get("/", async (_: Request, res: Response) => res.send("API running"));

app.get("/health", health);

app.use("/admin/queues", bullBoard.getRouter());

app.use("/api/auth", authRouter);

app.use("/api/section", authenticate, sectionRouter);

app.use("/api/page", authenticate, pageRouter);

app.use("/api/canvas", authenticate, canvasRouter);

app.use("/api/message", authenticate, messageRouter);

app.use("/api/ai", authenticate, aiRouter);

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
