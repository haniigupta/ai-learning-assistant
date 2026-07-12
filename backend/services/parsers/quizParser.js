class QuizParser {

    parse(text, count = 5) {

        try {

            // Remove markdown code fences if the model adds them
            const cleaned = text
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            const quizzes = JSON.parse(cleaned);

            if (!Array.isArray(quizzes)) {
                throw new Error("Quiz response is not an array.");
            }

            return quizzes.slice(0, count);

        } catch (error) {

            console.error("========== QUIZ JSON PARSE ERROR ==========");
            console.error(error);

            console.error("========== RAW RESPONSE ==========");
            console.error(text);

            throw new Error("Failed to parse quiz JSON.");

        }

    }

}

export default new QuizParser();