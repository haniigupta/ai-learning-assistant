export const buildFlashcardPrompt = (text, count = 10) => `
You are an expert teacher.

Generate exactly ${count} high-quality educational flashcards.

Rules:

- Cover the most important concepts.
- Questions should be clear and specific.
- Answers should be concise.
- Difficulty must be Easy, Medium, or Hard.
- Avoid duplicate questions.

Format:

Q: Question

A: Answer

D: Easy | Medium | Hard

Separate every flashcard using:

---

Study Material:

${text.substring(0, 8000)}
`;