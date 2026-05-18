import express from "express";

import localRouter from "./local/local.route.js";
import forgotPasswordRouter from "./forgot-password/forgot-password.route.js";
import authRouter from "./auth/auth.route.js";

const router: express.Router = express.Router();

router.use("/local", localRouter);
router.use("/password", forgotPasswordRouter);
router.use("/", authRouter);

export default router;
