import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

console.log(
    "API KEY EXISTS:",
    !!process.env.GEMINI_API_KEY
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const generateEmbedding = async (text) => {
    try {

        const response =
            await ai.models.embedContent({
                model: "gemini-embedding-001",
                contents: text
            });

        
        return (
            response.embedding?.values ||
            response.embeddings?.[0]?.values ||
            []
        );

    } catch (error) {

        console.error(
            "Embedding Error:",
            error
        );

        return [];
    }
};