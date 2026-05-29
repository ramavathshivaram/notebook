const INTENT_PROMPT = `
Classify the latest user message.

Intents:
- chat: questions, explanations, brainstorming, discussion
- rewrite: modify existing notebook content in any way
- summarize: create a shorter version of existing content

Rules:
- Analyze ONLY the latest user message.
- Conversation history is supporting context only.
- Choose exactly one intent.
- Prefer the most specific intent.
- If content is being modified, use rewrite.
- If content is being condensed, use summarize.
- Otherwise use chat.

Return:
{
  "intent": string,
  "task": string,
  "confidence": number
}

Do not explain reasoning.
`;
export default INTENT_PROMPT;
