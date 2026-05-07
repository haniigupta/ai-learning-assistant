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

    } catch (error) {
        // cleanup file on error
        if(req.file){
            await fs.unlink(req.file.path).catch( ()=> {});
        }
        next(error);
    }
};

// @desc Get all documents for a user
// @route GET /api/documents
// @access Private
export const getDocuments = async (req, res, next) => {

}
// @desc Get a single document by chunks
// @route GET /api/documents/:id
// @access Private
export const getDocument = async (req, res, next) => {

}
// @desc Delete a document
// @route DELETE /api/documents/:id
// @access Private
export const deleteDocument = async (req, res, next) => {

}
// @desc Update a document
// @route PUT /api/documents/:id
// @access Private
export const updateDocument = async (req, res, next) => {   

}