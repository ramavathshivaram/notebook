import express from "express";
import zodSchema from "#utils/zodSchema.js";
import validateRequest from "#middlewares/validateRequest.js";

import sectionController from "./section.controller.js";

const router = express.Router();

router.post(
  "/",
  validateRequest(zodSchema.createSectionSchema),
  sectionController.createSection,
);

router.get("/all", sectionController.getSections);

router.delete("/:sectionId", sectionController.deleteSection);

router.patch(
  "/:sectionId",
  validateRequest(zodSchema.renameSectionSchema),
  sectionController.renameSection,
);

export default router;
