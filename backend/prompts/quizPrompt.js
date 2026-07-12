export const buildQuizPrompt = (text, count = 5) => `
You are an expert exam generator.

Generate EXACTLY ${count} multiple-choice questions.

Return ONLY valid JSON.

Do NOT wrap the JSON inside markdown.
Do NOT write \`\`\`json.
Do NOT write explanations before or after the JSON.

The JSON schema must be:

[
  {
    "question": "string",
    "options": [
      "string",
      "string",
      "string",
      "string"
    ],
    "correctAnswer": "exact text of the correct option",
    "explanation": "string",
    "difficulty": "easy"
  }
]

Rules:

- Exactly four options.
- correctAnswer MUST match one of the options exactly.
- difficulty must be one of:
  - easy
  - medium
  - hard
- No duplicate questions.
- Base every question only on the study material.

Study Material:

${text.substring(0, 8000)}
`;