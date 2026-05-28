import express from "express";

import pageController from "./page.controller.js";

import pageLimitter from "#utils/limitters/page.limitter.js";

const router = express.Router();

router.post("/", pageLimitter.createPageLimiter, pageController.createPage);

router.get("/:pageId", pageLimitter.getPageLimiter, pageController.getPage);

router.get(
  "/all/:sectionId",
  pageLimitter.getPagesLimiter,
  pageController.getPages,
);

router.patch(
  "/:pageId",
  pageLimitter.updatePageLimiter,
  pageController.updatePage,
);

router.delete(
  "/:pageId",
  pageLimitter.deletePageLimiter,
  pageController.deletePage,
);

export default router;
