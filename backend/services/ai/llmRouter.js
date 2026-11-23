
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing from environment variables");
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const DEFAULT_MODEL =
    process.env.DEFAULT_MODEL || "openai/gpt-oss-20b";

class LLMRouter {
    async generate({
        prompt,
        temperature = 0.3,
        maxTokens = 2048,
    }) {
        try {
            if (!prompt || typeof prompt !== "string") {
                throw new Error("A valid prompt is required");
            }

            console.log(`Generating AI response using: ${DEFAULT_MODEL}`);

            const completion = await groq.chat.completions.create({
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

            const response = completion.choices?.[0]?.message?.content;

            if (!response || !response.trim()) {
                throw new Error("Groq returned an empty response");
            }

            return response.trim();

        } catch (error) {
            console.error("========== GROQ API ERROR ==========");
            console.error("Message:", error.message);
            console.error("Status:", error.status);
            console.error("Code:", error.code);
            console.error("Model:", DEFAULT_MODEL);
            console.error("====================================");

            // Preserve the original error for proper debugging.
            throw error;
        }
    }
}

export default new LLMRouter();
