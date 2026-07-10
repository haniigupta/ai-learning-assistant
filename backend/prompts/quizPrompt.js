export const buildQuizPrompt = (text, count = 5) => `
You are an expert exam creator.

Generate exactly ${count} multiple-choice questions.

Rules:

- Four options only.
- Only one correct answer.
- Questions should test understanding.
- Do not repeat concepts.
- Include a short explanation.

Format:

Q:

01:

02:

03:

04:

C:

E:

D:

Separate each question using:

---

Study Material:

${text.substring(0, 8000)}
`;