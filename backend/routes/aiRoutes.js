const express = require("express");
const router = express.Router();
const {
  generateAiNote,
  optimizeCanvasWithAI,
  generateCanvasDrawing,
  optimizationAINote,
} = require("../controllers/AIControllers");

router.post("/generate-ai-note", generateAiNote);

router.post("/optimize-canvas", optimizeCanvasWithAI);

router.post("/generate-canvas-drawing", generateCanvasDrawing);

router.post("/optimize-ai-note", optimizationAINote);

module.exports = router;
