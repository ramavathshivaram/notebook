import express from "express";

import messageController from "./message.worker.controller.js";

const router = express.Router();

router.post("/", messageController.create);

export default router;
