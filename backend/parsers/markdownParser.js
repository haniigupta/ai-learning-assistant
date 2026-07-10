class QuizParser {

    parse(text, count = 5) {

        const quizzes = [];

        const questionBlocks =
            text.split("---").filter(q => q.trim());

        for (const block of questionBlocks) {

            const lines = block.trim().split("\n");

            let question = "";

            let options = [];

            let correctAnswer = "";

            let explanation = "";

            let difficulty = "medium";

            for (const line of lines) {

                const trimmed = line.trim();

                if (trimmed.startsWith("Q:"))

                    question = trimmed.substring(2).trim();

                else if (trimmed.startsWith("01:"))

                    options.push(trimmed.substring(3).trim());

                else if (trimmed.startsWith("02:"))

                    options.push(trimmed.substring(3).trim());

                else if (trimmed.startsWith("03:"))

                    options.push(trimmed.substring(3).trim());

                else if (trimmed.startsWith("04:"))

                    options.push(trimmed.substring(3).trim());

                else if (trimmed.startsWith("C:"))

                    correctAnswer =
                        trimmed.substring(2).trim();

                else if (trimmed.startsWith("E:"))

                    explanation =
                        trimmed.substring(2).trim();

                else if (trimmed.startsWith("D:"))

                    difficulty =
                        trimmed.substring(2).trim().toLowerCase();

            }

            if (
                question &&
                options.length === 4 &&
                correctAnswer &&
                explanation
            ) {

                quizzes.push({

                    question,

                    options,

                    correctAnswer,

                    explanation,

                    difficulty

                });

            }

        }

        return quizzes.slice(0, count);

    }

}

export default new QuizParser();