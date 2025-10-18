const express = require("express");
const router = express.Router();
const getAiResponse = require("../config/ai");

router.post("/create", async (req, res) => {
  try {
    const { prompt } = req.body; // user’s question
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });
    const response = await getAiResponse(prompt);
    res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
