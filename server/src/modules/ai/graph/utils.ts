export const createIndexedText = (text: string) => {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  const chunkSize = 120;
  const chunks = [];

  for (let i = 0; i < normalizedText.length; i += chunkSize) {
    const chunk = normalizedText.slice(i, i + chunkSize);

    const endIndex = i + chunk.length - 1;

    chunks.push(`[${i}-${endIndex}]\n${chunk}`);
  }

  return chunks.join("\n\n");
};
