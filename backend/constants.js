const generateHTML = (otp, userId) => {
  return `<div style="
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: auto; 
      padding: 30px; 
      border: 2px solid #000; 
      border-radius: 15px; 
      background-color: #fff; 
      text-align: center; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  ">
      <h2 style="
          color: #000; 
          font-size: 28px; 
          margin-bottom: 15px; 
          text-transform: uppercase;
          letter-spacing: 1px;
      ">
          Password Reset OTP
      </h2>
      
      <p style="
          font-size: 16px; 
          color: #333; 
          margin-bottom: 25px;
      ">
          Use the OTP below to reset your password. It is valid for 10 minutes.
      </p>
      
      <div style="
          display: inline-block; 
          padding: 20px 40px; 
          font-size: 28px; 
          font-weight: bold; 
          color: #000; 
          border: 2px dashed #000; 
          border-radius: 10px; 
          margin-bottom: 25px;
          letter-spacing: 2px;
      ">
          ${otp}
      </div>
      
      <p style="font-size: 14px; color: #555; margin-bottom: 25px;">
          Do not share this OTP with anyone.
      </p>
      
      <a href="${process.env.FRONTEND_URL}/forgot-password/${userId}" 
        style="
          display: inline-block; 
          padding: 14px 30px; 
          font-size: 16px; 
          font-weight: bold; 
          text-decoration: none; 
          color: #fff; 
          background-color: #000; 
          border-radius: 8px;
          transition: all 0.3s ease;
      "
        onmouseover="this.style.backgroundColor='#333'; this.style.transform='scale(1.05)';"
        onmouseout="this.style.backgroundColor='#000'; this.style.transform='scale(1)';"
      >
        Verify OTP
      </a>
      
      <p style="font-size: 12px; color: #777; margin-top: 30px;">
          If you didn’t request a password reset, please ignore this email.
      </p>
  </div>`;
};


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

module.exports = {
   generateHTML,
   NOTE_RULES,
   CANVAS_GENERATION_RULES,
   CANVAS_OPTIMIZATION_RULES,
}