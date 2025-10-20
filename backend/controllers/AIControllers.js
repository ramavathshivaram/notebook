/* aiController.js */
const OpenAI = require("../config/ai");

/**
 * System rules/prompts
 */
const NOTE_RULES = `
Read first: Skim the note to understand context before editing — this avoids accidental deletions.
Follow the AI Note Optimization Rules:

1. Clarify and simplify writing.
2. Structure content using only the following HTML tags: h1, h2, h3, p, b, li, ol, ul.
3. Do NOT include any styles, classes, ids, or other HTML attributes.
4. Keep the meaning unchanged.
5. Preserve code and technical data.
6. Return the final result as a clean HTML string that can be safely rendered in ReactQuill.
7. Do NOT return JSON, markdown, or any extra metadata — only the HTML content string.
`;

const CANVAS_GENERATION_RULES = `
You are an expert in vector and drawing optimization.

Task:
1. Read the existing canvas JSON if provided.
2. Optimize it — remove redundant points, merge similar paths, and ensure smooth, consistent curves.
3. If the user provides a prompt, generate new drawing paths according to it.
4. Always return ONLY a JSON array in this format:

[
  {
    "drawMode": true,
    "strokeColor": "#000000",
    "strokeWidth": 3,
    "paths": [
      { "x": 301.296875, "y": 326 },
      { "x": 323.296875, "y": 308 }
    ]
  }
]

Rules:
- Return only valid JSON (no explanation, no markdown).
- Keep coordinates within 0-2000 unless user specifies otherwise.
- Maintain strokeColor and strokeWidth types.
- Round coordinates to max 3 decimal places.
`;

const CANVAS_OPTIMIZATION_RULES = `
You are an expert in vector and drawing optimization.

Task:
1. Read the provided canvas JSON (array of stroke objects).
2. Optimize it:
   - Remove consecutive duplicate/near-duplicate points.
   - Remove empty/zero-length paths.
   - Round coordinates to 2 decimal places.
   - Merge adjacent paths that have identical strokeColor and strokeWidth if they are continuous.
   - Keep structure: { drawMode, strokeColor, strokeWidth, paths }.
3. Return ONLY the optimized JSON array (same structure as input).
`;

const getAIResponse = async (userMessage, systemRules) => {
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const temperature = 0.7;

  try {
    const response = await OpenAI.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemRules || "" },
        { role: "user", content: userMessage },
      ],
      temperature,
    });

    const message = response?.choices?.[0]?.message?.content;
    if (message && message.includes("```html")) {
      message.replace(/```html|```/g, "").trim();
    }
    return message;
  } catch (err) {
    console.error("getAIResponse error:", err?.message || err);
    return null;
  }
};

const generateAiNote = async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json({ message: "Prompt is required and must be a string." });
    }

    // Compose user message asking for JSON output
    const userMessage = `User request:"${prompt}"`;

    const aiRaw = await getAIResponse(userMessage, NOTE_RULES, {
      temperature: 0.6,
      max_tokens: 1200,
    });
    return res.status(200).json({ message: aiRaw });
  } catch (err) {
    console.error("generateAiNote error:", err?.message || err);
    res
      .status(500)
      .json({ message: err.message || "AI note generation failed." });
  }
};

const optimizationAINote = async (req, res) => {
  try {
    const { prompt, noteContent } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json({ message: "Prompt is required and must be a string." });
    }
    // console.log(prompt,noteContent)

    const userMessage = `
Optimize the following note content based on the user's request.
User request: "${prompt}"
Note content:
${noteContent}
`;

    const aiRaw = await getAIResponse(userMessage, NOTE_RULES);
    return res.status(200).json({ message: aiRaw });
  } catch (error) {
    res.status(500).json({ message: "AI note optimization failed." });
  }
};

const optimizeCanvasWithAI = async (req, res) => {
  try {
    const { canvasJSON } = req.body || {};
    if (!canvasJSON) {
      return res
        .status(400)
        .json({ message: "canvasJSON is required in body." });
    }

    // Ensure we send a string payload for the AI
    const userMessage = `Optimize the following canvas JSON array. Return ONLY the optimized JSON array (no text).

${JSON.stringify(canvasJSON)}
`;

    const parsed = await getAIResponse(userMessage, CANVAS_OPTIMIZATION_RULES, {
      temperature: 0.3,
      max_tokens: 1600,
    });

    return res.status(200).json({ optimized: parsed });
  } catch (err) {
    console.error("optimizeCanvasWithAI error:", err?.message || err);
    res
      .status(500)
      .json({ message: err.message || "Canvas optimization failed." });
  }
};

const generateCanvasDrawing = async (req, res) => {
  try {
    const {
      prompt,
      width = 1000,
      height = 562,
      style = "clean-diagram",
      existingCanvas,
    } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json({ message: "prompt is required and must be a string." });
    }

    const payload = {
      meta: { width, height, style },
      prompt,
      existingCanvas: existingCanvas ? existingCanvas : null,
    };

    const userMessage = `
Create an editable canvas array (JSON) that matches the user's prompt.
Canvas meta: width=${width}, height=${height}, style=${style}
If existingCanvas is provided, produce new paths that can be merged (do not overwrite unless requested).
Return ONLY a JSON array of stroke objects in this format:
[
  { "drawMode": true, "strokeColor": "#000000", "strokeWidth": 3, "paths":[ {"x":10,"y":10}, {"x":100,"y":100} ] }
]
User request: ${prompt}

Existing canvas (if any):
${existingCanvas ? JSON.stringify(existingCanvas) : "none"}
`;

    const parsed = await getAIResponse(
      userMessage,
      CANVAS_GENERATION_RULES,
      payload
    );
    return res.status(200).json({ canvas: parsed });
  } catch (err) {
    console.error("generateCanvasDrawing error:", err?.message || err);
    res
      .status(500)
      .json({ message: err.message || "Canvas drawing generation failed." });
  }
};

module.exports = {
  generateAiNote,
  optimizeCanvasWithAI,
  generateCanvasDrawing,
  optimizationAINote,
};
