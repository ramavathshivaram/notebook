const PLANNER_PROMPT = `
Generate an ordered workflow plan for modifying a ReactQuill HTML document.

Rules:
- Return only structured output.
- Do not generate content.
- Do not generate HTML.
- Focus on safe execution steps.

Requirements:
- Preserve valid HTML.
- Preserve ReactQuill compatibility.
- Preserve formatting consistency.
- Prefer minimal safe changes.

Each step:
- concise
- actionable
- execution-focused

Example:
[
  "analyze document structure",
  "identify safe edit strategy",
  "preserve formatting",
  "validate HTML integrity"
]
`;

export default PLANNER_PROMPT;
