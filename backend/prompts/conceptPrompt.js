export const buildConceptPrompt = (concept, context) => `
You are an expert teacher.

Explain the following concept using ONLY the provided context.

Rules:

- Keep the explanation beginner-friendly.
- Use examples whenever possible.
- Do not invent information.
- If the concept is absent from the context, clearly say so.

Concept:

${concept}

Context:

${context.substring(0, 10000)}

Explanation:
`;