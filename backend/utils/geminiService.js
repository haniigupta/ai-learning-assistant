import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,

});
console.log(
  "KEY PREFIX:",
  process.env.GEMINI_API_KEY?.slice(0, 12)
);

if (!process.env.GEMINI_API_KEY) {
    console.warn("Warning: GEMINI_API_KEY is not set. Gemini API calls will fail.");
    process.exit(1);
}

/**
 * Generate flashcards from text
 * @param {string} text - The input text to generate flashcards from
 * @param {number} count - The number of flashcards to generate
 * @return {Promise<Array<{question: string, answer: string, difficulty: string}>>} - An array of generated flashcards
 * 
 */
export const generateFlashcards = async (text, count = 10) => {
    const prompt = `Generate exactly ${count} educational flashcards from the following text.
    Format each flashcard as:
    Q: [Clear, specific question]
    A: [Concise, accurate answer]
    D: [Difficulty level: Easy, Medium, Hard]
    
    Separate each flashcard with "---".

    Text:
    ${text.substring(0, 8000)}`;

    try {
        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: prompt,
                });
                break;
            } catch (error) {
                if (error.status !== 503 || attempt === 3) {
                    throw error;
                }

                console.log(`Gemini busy. Retrying ${attempt}/3`);

                await new Promise(resolve =>
                    setTimeout(resolve, 3000 * attempt)
                );
            }
        }
    

    const generatedText = response.text;

    // parse the response 
    const flashcards = [];
    const cards = generatedText.split('---').filter(c => c.trim());

    for (const card of cards) {
        const lines = card.trim().split('\n');
        let question = '', answer = '', difficulty = 'medium';

        for (const line of lines) {
            if (line.startsWith('Q:')) {
                question = line.substring(2).trim();
            } else if (line.startsWith('A:')) {
                answer = line.substring(2).trim();
            } else if (line.startsWith('D:')) {

                const diff = line.substring(2).trim().toLowerCase();
                if (['easy', 'medium', 'hard'].includes(diff)) {
                    difficulty = diff;
                }
            }
        }
        if (question && answer) {
            flashcards.push({ question, answer, difficulty });
        }
    }
    return flashcards.slice(0, count); // return only the requested number of flashcards
} catch (error) {
    console.error("Error generating flashcards:", error);
    throw new Error("Failed to generate flashcards");
}
};

/**
 * Generate quiz questions from text
 * @param {string} text - The input text to generate quiz questions from
 * @param {number} count - The number of quiz questions to generate
 * @return {Promise<Array<{question: string, options: Array, correctAnswer: string, explanation: string, difficulty: string}>>} - An array of generated quiz questions
 */

export const generateQuiz = async (text, numQuestions = 5) => {
    const prompt = `Generate exactly ${numQuestions} multiple-choice quiz questions from the following text.

Format each question as:

Q: [Question]
01: [Option 1]
02: [Option 2]
03: [Option 3]
04: [Option 4]

C: [Exact correct answer text]

Example:

01: Apple
02: Mango
03: Banana
04: Orange

C: Banana

Never return option numbers.
Return the full correct answer text.

E: [Brief explanation]
D: [Difficulty level: Easy, Medium, Hard]

Separate each question with "---".

Text:
${text.substring(0, 8000)}`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const generatedText = response.text;

        // parse the response
        const quizQuestions = [];
        const questionBlocks = generatedText.split('---').filter(q => q.trim());

        for (const block of questionBlocks) {
            const lines = block.trim().split('\n');
            let question = '', options = [], correctAnswer = '', explanation = '', difficulty = 'medium';

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('Q:')) {
                    question = trimmedLine.substring(2).trim();
                } else if (trimmedLine.startsWith('01:')) {
                    options.push(trimmedLine.substring(3).trim());
                } else if (trimmedLine.startsWith('02:')) {
                    options.push(trimmedLine.substring(3).trim());
                } else if (trimmedLine.startsWith('03:')) {
                    options.push(trimmedLine.substring(3).trim());
                } else if (trimmedLine.startsWith('04:')) {
                    options.push(trimmedLine.substring(3).trim());
                } else if (trimmedLine.startsWith('C:')) {
                    correctAnswer = trimmedLine.substring(2).trim();
                } else if (trimmedLine.startsWith('E:')) {
                    explanation = trimmedLine.substring(2).trim();
                } else if (trimmedLine.startsWith('D:')) {
                    difficulty = trimmedLine.substring(2).trim().toLowerCase();
                }
            }
            if (question && options.length === 4 && correctAnswer && explanation) {

                const answerIndex =
                    parseInt(correctAnswer) - 1;

                if (
                    !isNaN(answerIndex) &&
                    options[answerIndex]
                ) {
                    correctAnswer =
                        options[answerIndex];
                }

                quizQuestions.push({
                    question,
                    options,
                    correctAnswer,
                    explanation,
                    difficulty
                });
            }
        }
        return quizQuestions.slice(0, numQuestions);
    } catch (error) {
        console.error("Error generating quiz questions:", error);
        throw new Error("Failed to generate quiz");
        
    }
};

/**
 * Generate a summary from text
 * @param {string} text - The input text to generate a summary from
 * @return {Promise<string>} - The generated summary
 */
export const generateSummary = async (text) => {
    const prompt = `Summarize the following text in a concise and informative manner. Focus on the key points and main ideas, and avoid unnecessary details.
Text:
${text.substring(0, 15000)}`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const generatedText = response.text;
        return generatedText.trim();
    } catch (error) {
        console.error("Error generating summary:", error);
        throw new Error("Failed to generate summary");
    }
};

/**
 * Chat with the assistant about a document
 * @param {string} question - The question about the document
 * @param {Array<Object>} chunks - doc chunks
 * @return {Promise<string>} - The assistant's response
 */
export const chatWithContext = async (question, chunks) => {
    const context = chunks.map(chunk =>
        `Chunk ${chunk.chunkIndex}:\n${chunk.content}`
    ).join('\n\n');

    console.log("context____", context);

    const prompt = `
You are an AI Learning Assistant.

Rules:

1. Answer ONLY using the provided context.
2. If the answer is not present in the context, respond:
   "The document does not contain enough information."
3. Do not invent facts.
4. Explain concepts in a simple educational way.
5. Use bullet points when appropriate.
6. If multiple chunks contribute to the answer, combine them logically.
7. Keep answers concise but complete.

Context:
${context}

Question:
${question}

Answer:
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        const generatedText = response.text;
        return generatedText.trim();

    } catch (error) {
        console.error("Error in chatWithContext:", error);
        throw new Error("Failed to get response from assistant");
    }

};

/**
 * Explain a concept from the document
 * @param {string} concept - The concept to explain
 * @param {string} context - The context to use for the explanation
 * @return {Promise<string>} - The explanation of the concept
 */
export const explainConcept = async (concept, context) => {
    const prompt = `Explain the following concept in simple terms, using the provided context. If the concept is not covered in the context, say you don't know.

    Context:
    ${context.substring(0, 10000)}`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const generatedText = response.text;
        return generatedText.trim();
    } catch (error) {
        console.error("Error explaining concept:", error);
        throw new Error("Failed to explain concept");
    }
};
