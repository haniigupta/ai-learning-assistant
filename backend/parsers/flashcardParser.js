class FlashcardParser {

    parse(text, count = 10) {

        const flashcards = [];

        const cards =
            text.split("---").filter(card => card.trim());

        for (const card of cards) {

            const lines = card.trim().split("\n");

            let question = "";
            let answer = "";
            let difficulty = "medium";

            for (const line of lines) {

                const trimmed = line.trim();

                if (trimmed.startsWith("Q:")) {

                    question = trimmed.substring(2).trim();

                }

                else if (trimmed.startsWith("A:")) {

                    answer = trimmed.substring(2).trim();

                }

                else if (trimmed.startsWith("D:")) {

                    const diff =
                        trimmed.substring(2).trim().toLowerCase();

                    if (
                        ["easy", "medium", "hard"].includes(diff)
                    ) {
                        difficulty = diff;
                    }

                }

            }

            if (question && answer) {

                flashcards.push({

                    question,

                    answer,

                    difficulty

                });

            }

        }

        return flashcards.slice(0, count);

    }

}

export default new FlashcardParser();