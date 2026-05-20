import express from "express";

import {
  persistCreatePage,
  persistUpdatePage,
  persistDeletePage,
} from "./page.controller.worker.js";

const router = express.Router();

router.post("/", persistCreatePage);

router.patch("/:pageId", persistUpdatePage);

router.delete("/:pageId", persistDeletePage);

export default router;
