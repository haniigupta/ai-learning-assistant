export const buildSummaryPrompt = (text) => `
You are an expert AI Learning Assistant.

Your task is to generate a clear, structured summary of the provided study material.

Instructions:

- Focus only on important concepts.
- Remove repetitive information.
- Preserve technical terms.
- Use headings and bullet points whenever helpful.
- Do not invent information.
- Keep the summary concise but complete.

Study Material:

${text.substring(0, 15000)}

Summary:
`;