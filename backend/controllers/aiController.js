import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import ChatHistory from '../models/ChatHistory.js';
import * as geminiService from '../utils/geminiService.js';
import { findRelevantChunks } from '../utils/textChunker.js';

// @desc Generate flashcards for a document
// @route POST /api/ai/generate-flashcards
// @access Private
export const generateFlashcards = async (req, res, next) => {
    try{
        const { documentId, count=10 } = req.body;

        if(!documentId){
            return res.status(400).json({
                success: false,
                message: "documentId is required",  
                statusCode : 400
            });
        }
        const document = await Document.findOne({ 
            _id: documentId, 
            userId: req.user._id,
            status: 'ready'
        });
        if(!document){
            return res.status(404).json({
                success: false,
                message: "Document not found or not ready for processing",
                statusCode : 404
            });
        }

        // generate flashcard using gemini
        const cards = await geminiService.generateFlashcards(
            document.extractedText, 
            parseInt(count)
        );
        // save flashcards to db
        const flashcardSet = await Flashcard.create({
            documentId: document._id,
            userId: req.user._id,
            cards: cards.map( card => ({
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
                reviewCount: 0,
                isStarred: false
             }))
         });
        

        res.status(200).json({
            success: true,
            data: flashcardSet,
            message: 'Flashcards generated successfully'
        });
    }catch (error) {
        next(error);
    }
};

// @desc Generate quiz for a document
// @route POST /api/ai/generate-quiz
// @access Private
export const generateQuiz = async (req, res, next) => {
    try{

    }catch (error) {
        next(error);
    }
};

// @desc Generate summary for a document
// @route POST /api/ai/generate-summary
// @access Private
export const generateSummary = async (req, res, next) => {

};

// @desc Chat with the assistant about a document
// @route POST /api/ai/chat
// @access Private
export const chat = async (req, res, next) => {

};

// @desc Explain a concept from the document
// @route POST /api/ai/explain-concept
// @access Private
export const explainConcept = async (req, res, next) => {

};

// @desc Get chat history for a document
// @route GET /api/ai/chat-history/:documentId
// @access Private
export const getChatHistory = async (req, res, next) => {

};