import { stat } from 'fs';
import Document from '../models/Document.js'
import Flashcard from '../models/Flashcard.js'
import Quiz from '../models/Quiz.js'
import { extraTextFromPDF } from '../utils/textChunker.js'
import fs from 'fs/promises';
import mongoose from 'mongoose';

// @desc Upload a document
// @route POST /api/documents/upload
// @access Private

export const uploadDocument = async (req, res, next) => {
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "No file uploaded, please upload a PDF document",
                statusCode : 400
            });
        }
        const { title } = req.body;
        if(!title){
            // cleanup file if title is missing
            await fs.unlink(req.file.path);
            return res.status(400).json({
                success: false,
                message: "Title is required",
                statusCode : 400
            });
        }
        // contsruct URL for the uploaded file
        const baseUrl = `http://localhost:${process.env.PORT || 5000}`;
        const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

        //create document record in database
        const document = await Document.create({
            userId: req.user._id,
            title,
            fileName: req.file.originalname,
            filePath: fileUrl,
            fileSize: req.file.size,
            status: "processing"
        });
        // Process the PDF in the background (async)
        processPDF(document._id, req.file.path).catch( async (error) => {
            console.error("Error processing PDF:", error);
        });

        res.status(201).json({
            success: true,
            data: document,
            message: "File uploaded successfully, processing in background",
        }); 

    } catch (error) {
        // cleanup file on error
        if(req.file){
            await fs.unlink(req.file.path).catch( ()=> {});
        }
        next(error);
    }
};
//Hleper function to process PDF and update document status
const processPDF = async (documentId, filePath) => {
    try {
        const { text } = await extraTextFromPDF(filePath);

        // create chunks
        const chunks = chunkText(text, 500, 50);

        // Update document status
        await Document.findByIdAndUpdate(documentId, { 
            extractedText: text,
            chunks,
            status: "processed" 
        });
        console.log(`Document ${documentId} processed successfully with ${chunks.length} chunks.`);

    } catch (error) {
        console.error(`Error processing document ${documentId}:`, error);
        await Document.findByIdAndUpdate(documentId, { status: "failed" });
    }
};

// @desc Get all documents for a user
// @route GET /api/documents
// @access Private
export const getDocuments = async (req, res, next) => {
     try {
        

    } catch (error) {
        next(error);
    }
}
// @desc Get a single document by chunks
// @route GET /api/documents/:id
// @access Private
export const getDocument = async (req, res, next) => {
    try {
        

    } catch (error) {
        next(error);
    }
}
// @desc Delete a document
// @route DELETE /api/documents/:id
// @access Private
export const deleteDocument = async (req, res, next) => {
    try {
        

    } catch (error) {
        next(error);
    }
}
// @desc Update a document
// @route PUT /api/documents/:id
// @access Private
export const updateDocument = async (req, res, next) => {   
    try {
        

    } catch (error) {
        next(error);
    }
}
