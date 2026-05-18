import env from "#configs/env.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import rateLimiterMiddleware, {
  authLimiter,
} from "#middlewares/rateLimiter.js";


import {
  auth,
  sendOTP,
  verifyOTP,
  resetPassword,
  updateUser,
} from "./controllers/userControllers"
import sectionRoutes from "../routes/sectionRoutes.js"
import pageRoutes from "../routes/pageRoutes.js"
import aiRoutes from "../routes/aiRoutes.js"
import canvasRoutes from "../routes/canvasRoutes.js"
import notFoundRoute from "#middlewares/notFoundRoute.js";
import errorHandler from "#middlewares/errorHandler.js";

const corsOptions = {
  origin: env.ORIGIN,
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//! Middlewares
app.use(morganMiddleware);
app.use(rateLimiterMiddleware(authLimiter));
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

app.get("/", async (req:Request, res:Response) => res.send("API running"));

app.get("/health", async (req:Request, res:Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
  });
});

app.post("/api/auth", auth);
app.post("/api/forgot-password/send-otp", sendOTP);
app.post("/api/forgot-password/verify-otp", verifyOTP);
app.post("/api/forgot-password/reset", resetPassword);


app.post("/api/update-user", updateUser);

// Section Routes
app.use("/api/section", sectionRoutes);

// Page Routes
app.use("/api/page", pageRoutes);

// Canvas Routes
app.use("/api/canvas", canvasRoutes);

// AI Routes
app.use("/api/ai", aiRoutes);

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
