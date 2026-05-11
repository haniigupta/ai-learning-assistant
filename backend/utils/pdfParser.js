import fs from "fs/promises";
import {PDFParse} from "pdf-parse";

/**
 * Extract text from a PDF file
 * @param {string} filePath - The path to the PDF file
 * @returns {Promise<{text: string, numPages: number, info: object}>} - The extracted text, page count, and info from the PDF
 */
export const extractTextFromPDF = async (filePath) => {
    try{
        const dataBuffer = await fs.readFile(filePath);
        // pdf-parse expects unit8 array not buffer
        const data = await PDFParse(new Uint8Array(dataBuffer));
        return { text: data.text, numPages: data.numpages, info: data.info };
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error("Failed to extract text from PDF");
    }
}