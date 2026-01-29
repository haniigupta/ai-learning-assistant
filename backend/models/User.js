import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide  a username'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be atleast 3 character']
    },
    
})