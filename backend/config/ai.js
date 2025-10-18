require("dotenv").config();

// Node 18+ supports fetch natively
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
        messages: [{ role: "user", content: prompt }],
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
