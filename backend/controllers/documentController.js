import { stat } from 'fs';
import Document from '../models/Document.js'
import Flashcard from '../models/Flashcard.js'
import Quiz from '../models/Quiz.js'
import { extractTextFromPDF } from '../utils/pdfParser.js';
import { chunkText } from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import { count } from 'console';
import { generateEmbedding } from '../utils/embeddingService.js';

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
//Helper function to process PDF and update document status
const processPDF = async (documentId, filePath) => {
    try {

        const { text } =
            await extractTextFromPDF(filePath);

        // Create chunks
        const rawChunks =
            chunkText(text, 500, 50);

        // Generate embeddings
        

        for (const chunk of rawChunks) {

            const embedding =
                await generateEmbedding(
                    chunk.content
                );

            chunks.push({
                ...chunk,
                embedding
            });
        }
       

        // Save everything
        await Document.findByIdAndUpdate(
            documentId,
            {
                extractedText: text,
                chunks,
                status: "ready"
            }
        );

        console.log(
            `Document ${documentId} processed successfully with ${chunks.length} chunks.`
        );

    } catch (error) {

        console.error(
            `Error processing document ${documentId}:`,
            error
        );

        await Document.findByIdAndUpdate(
            documentId,
            {
                status: "failed"
            }
        );
    }
};
// @desc Get all documents for a user
// @route GET /api/documents
// @access Private
export const getDocuments = async (req, res, next) => {
     try {
        const  documents = await Document.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
            { $lookup: {
                from: 'flashcards',
                localField: '_id',
                foreignField: 'documentId',
                as: 'flashcards'
            }},
            { $lookup: {
                from: 'quizzes',
                localField: '_id',
                foreignField: 'documentId',
                as: 'quizzes'
            }},
            { $addFields: {
                flashcardCount: { $size: "$flashcards" },
                quizCount: { $size: "$quizzes" }
            }},
            { $project: {
                extractedText: 0,
                chunks: 0,
                flashcardSets: 0,
                quizzes: 0
            }},
            { $sort: { uploadDate: -1 } }
        ]);

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });

    } catch (error) {
        next(error);
    }
}
// @desc Get a single document by chunks
// @route GET /api/documents/:id
// @access Private
export const getDocument = async (req, res, next) => {
    try {
        const document = await Document.findOne({ 
            _id: req.params.id, 
            userId: req.user._id
        });
        if(!document){
            return res.status(404).json({
                success: false,
                message: "Document not found",
                statusCode : 404
            });
        }
        //get counts of associated flashcards and quizzes
        const flashcardCount = await Flashcard.countDocuments({ documentId: document._id, userId: req.user._id });
        const quizCount = await Quiz.countDocuments({ documentId: document._id, userId: req.user._id });

        //update last accessed 
        document.lastAccessed = Date.now();
        await document.save();

        // combined doc with the counts
        const documentData = document.toObject();
        documentData.flashcardCount = flashcardCount;
        documentData.quizCount = quizCount;

        res.status(200).json({
            success: true,
            data: documentData
        });

    } catch (error) {
        next(error);
    }
}
// @desc Delete a document
// @route DELETE /api/documents/:id
// @access Private
export const deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.user._id   
        });
        if(!document){
            return res.status(404).json({
                success: false,
                message: "Document not found",
                statusCode : 404
            });
        }
        // delte file from file system
        await fs.unlink(document.filePath).catch( () => {});
        
        

        res.status(200).json({
            success: true,
            message: "Document deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
