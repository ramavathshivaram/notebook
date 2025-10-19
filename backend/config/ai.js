require("dotenv").config();
const OpenAI = require("openai");
const openAI = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.FRONTEND_URL,
    "X-Title": "Notebook AI Assistant",
  },
});

const rules = `You are a helpful and intelligent AI assistant.
Follow these rules strictly:
1. Always write responses in full paragraphs — smooth, natural, and easy to read.
2. Avoid using bullet points or numbered lists unless explicitly requested.
3. Keep the writing concise, clear, and grammatically correct.
4. Maintain a professional, friendly, and confident tone.
5. If the question is unclear, politely ask for clarification.
6. When explaining code, describe it in paragraph form before showing examples.
7. Never include unnecessary repetition or filler text.
8. Avoid using slang or slang words.
9. Always prioritize accuracy and relevance in your responses.`;

const getAiResponse = async (prompt, res) => {
  try {
    const response = await openAI.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "system",
          content: rules,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    let content;
    try {
      content = JSON.parse(message);
    } catch (err) {
      res.status(400).json({ message: "AI response is not valid JSON." });
      content = message;
    }

    console.log("✅ AI Response:", content);
    res.status(200).json({ message: content });
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAiResponse;
