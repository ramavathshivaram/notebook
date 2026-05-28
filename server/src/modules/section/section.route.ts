import express from "express";

import zodSchema from "#utils/zodSchema.js";

import validateRequest from "#middlewares/validateRequest.js";
import sectionLimitter from "#utils/limitters/section.limitter.js";

import sectionController from "./section.controller.js";

const router = express.Router();

router.post(
  "/",
  sectionLimitter.createSectionLimiter,
  validateRequest(zodSchema.createSectionSchema),
  sectionController.createSection,
);

router.get(
  "/all",
  sectionLimitter.getSectionsLimiter,
  sectionController.getSections,
);

router.delete(
  "/:sectionId",
  sectionLimitter.deleteSectionLimiter,
  sectionController.deleteSection,
);

router.patch(
  "/:sectionId",
  sectionLimitter.renameSectionLimiter,
  validateRequest(zodSchema.renameSectionSchema),
  sectionController.renameSection,
);

export default router;
