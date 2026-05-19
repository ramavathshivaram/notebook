import express from "express";
import pageController from "./page.controller.js";

const router = express.Router();

router.post("/", pageController.createPage);

router.get("/:pageId", pageController.getPage);

router.patch("/:pageId", pageController.updatePage);

router.delete("/:pageId", pageController.deletePage);

export default router;
