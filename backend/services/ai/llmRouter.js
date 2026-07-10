import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const DEFAULT_MODEL =
    process.env.DEFAULT_MODEL ||
    "llama-3.3-70b-versatile";

class LLMRouter {

    async generate({
        prompt,
        temperature = 0.3,
        maxTokens = 2048,
    }) {

        try {

            const completion =
                await groq.chat.completions.create({

                    model: DEFAULT_MODEL,

                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],

                    temperature,

                    max_completion_tokens: maxTokens,

                });

            return completion.choices[0].message.content;

        } catch (error) {

            console.error("LLM Error:", error);

            throw new Error("Failed to generate AI response");

        }

    }

}

export default new LLMRouter();