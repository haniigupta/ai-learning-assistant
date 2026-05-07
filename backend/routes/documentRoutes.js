import express from 'express'
import {
    uploadDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from '../controllers/documentController.js'
import protect  from '../middleware/auth.js'
import upload from '../config/multer.js'

const router = express.Router();

// all routes are protected
router.use(protect)