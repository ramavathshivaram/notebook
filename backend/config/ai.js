require("dotenv").config();

const getAiResponse = async (prompt) => {
  try {
    const res = await fetch(process.env.AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        messages: [
          {
            role: "system",
            content: `You are a helpful and intelligent AI assistant.
                      Follow these rules strictly:
                      1. Always write responses in full paragraphs — smooth, natural, and easy to read.
                      2. Avoid using bullet points or numbered lists unless explicitly requested.
                      3. Keep the writing concise, clear, and grammatically correct.
                      4. Maintain a professional, friendly, and confident tone.
                      5. If the question is unclear, politely ask for clarification.
                      6. When explaining code, describe it in paragraph form before showing examples.
                      7. Never include unnecessary repetition or filler text.
                      8. Avoid using slang or slang words.
                      9. Always prioritize accuracy and relevance in your responses`,
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = getAiResponse;
