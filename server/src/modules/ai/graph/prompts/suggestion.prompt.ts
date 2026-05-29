const SUGGESTIONS_PROMPT = `
Generate 3-5 short actionable next-step suggestions.

Requirements:
- Under 6 words each
- No duplicates
- Continue the user's workflow
- Use the response and intent as context
- Avoid generic suggestions

Good:
- Generate flashcards
- Create quiz questions
- Add practical examples
- Simplify explanation
- Continue writing

Bad:
- Help user
- Improve this
- Continue

The suggestions field must contain only strings.
`;

export default SUGGESTIONS_PROMPT;
