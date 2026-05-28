import express from "express";

import zodSchema from "#utils/zodSchema.js";

import validateRequest from "#middlewares/validateRequest.js";

import rateLimiterMiddleware, {
  createLimiter,
} from "#middlewares/rateLimiter.js";

import sectionController from "./section.controller.js";

const router = express.Router();

const createSectionLimiter = createLimiter({
  keyPrefix: "createSection",
  points: 15,
  duration: 60,
  blockDuration: 30,
});

const getSectionsLimiter = createLimiter({
  keyPrefix: "getSections",
  points: 100,
  duration: 60,
  blockDuration: 15,
});

const deleteSectionLimiter = createLimiter({
  keyPrefix: "deleteSection",
  points: 10,
  duration: 60,
  blockDuration: 60,
});

const renameSectionLimiter = createLimiter({
  keyPrefix: "renameSection",
  points: 30,
  duration: 60,
  blockDuration: 30,
});

router.post(
  "/",
  rateLimiterMiddleware(createSectionLimiter),
  validateRequest(zodSchema.createSectionSchema),
  sectionController.createSection,
);

router.get(
  "/all",
  rateLimiterMiddleware(getSectionsLimiter),
  sectionController.getSections,
);

router.delete(
  "/:sectionId",
  rateLimiterMiddleware(deleteSectionLimiter),
  sectionController.deleteSection,
);

router.patch(
  "/:sectionId",
  rateLimiterMiddleware(renameSectionLimiter),
  validateRequest(zodSchema.renameSectionSchema),
  sectionController.renameSection,
);

export default router;
