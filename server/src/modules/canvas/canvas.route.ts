import express from "express";
import canvasController from "./canvas.controller.js";

const router = express.Router();

router.post("/", canvasController.createCanvas);

router.get("/:canvasId", canvasController.getCanvas);

router.get("/all/:sectionId", canvasController.getCanvass);

router.patch("/:canvasId", canvasController.updateCanvas);

router.delete("/:canvasId", canvasController.deleteCanvas);

export default router;
