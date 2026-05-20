import express from "express";

import {
  persistCreatePage,
  persistUpdatePage,
  persistDeletePage,
} from "./page.controller.worker.js";

const router = express.Router();

router.post("/page", persistCreatePage);

router.patch("/page/:pageId", persistUpdatePage);

router.delete("/page/:pageId", persistDeletePage);

export default router;
