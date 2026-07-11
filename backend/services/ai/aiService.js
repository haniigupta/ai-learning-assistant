import llmRouter from "./llmRouter.js";

import flashcardParser from "../parsers/flashcardParser.js";
import markdownParser from "../parsers/markdownParser.js";

import { buildSummaryPrompt } from "../../prompts/summaryPrompt.js";
import { buildFlashcardPrompt } from "../../prompts/flashcardPrompt.js";
import { buildQuizPrompt } from "../../prompts/quizPrompt.js";
import { buildChatPrompt } from "../../prompts/chatPrompt.js";
import { buildConceptPrompt } from "../../prompts/conceptPrompt.js";

class AIService {

    async generateSummary(text) {

    const prompt =
        buildSummaryPrompt(text);

    const response =
        await llmRouter.generate({

            prompt,

            temperature: 0.2

        });

    return markdownParser.clean(response);

}

    async generateFlashcards(text, count = 10) {

        const prompt =
            buildFlashcardPrompt(text, count);

        const response =
            await llmRouter.generate({

                prompt,

                temperature: 0.3

            });

        return flashcardParser.parse(
            response,
            count
        );

    }

    async generateQuiz(text, count) {

        const prompt =
            buildQuizPrompt(text, count);

        return await llmRouter.generate({
            prompt,
            temperature: 0.4
        });

    }

    async chat(question, context) {

        const prompt =
            buildChatPrompt(question, context);

        return await llmRouter.generate({
            prompt,
            temperature: 0.3
        });

    }

    async explainConcept(concept, context) {

        const prompt =
            buildConceptPrompt(concept, context);

        return await llmRouter.generate({
            prompt,
            temperature: 0.3
        });

    }

}

export default new AIService();