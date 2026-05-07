import Document from '../models/Document.js'
import Flashcard from '../models/Flashcard.js'
import Quiz from '../models/Quiz.js'
import { extraTextFromPDF } from '../utils/textChunker.js'
import fs from 'fs/promises';
import mongoose from 'mongoose';

// @desc Upload a document
// @route POST /api/documents/upload
// @access Private