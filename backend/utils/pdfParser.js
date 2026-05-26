import fs from "fs/promises";
import * as pdfjs from "pdf-parse";

export const extractTextFromPDF = async (filePath) => {

    try {

        const dataBuffer = await fs.readFile(filePath);

        const data = await pdfjs.default(dataBuffer);

        return {
            text: data.text,
            numPages: data.numpages,
            info: data.info,
        };

    } catch (error) {

        console.error("Error extracting text from PDF:", error);

        throw new Error("Failed to extract text from PDF");
    }
};