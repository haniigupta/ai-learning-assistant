import jwt from "jsonwebtoken"
import User from '../models/User.js'

//generate JWT TOken 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "7d",
    })
}

// @desc    regsiter new user
// @route   POST/ api/auth/ register  
//@access   Public
export const register = async (req, res, next ) => {
    try {

    }catch(error){
        next(error);
    }
}

// @desc  Login user
// @route   POST/ api/auth/login
// @access    Public
export const login = async(req,res,next)=>{

}

//@desc     get user profile
//@route    GET/api/auth/profile
//@access   Private
export const getProfile = async(req, res, next) =>{

}

//@desc    Update user profile
//@route    PUT/api/auth/profile
//@access       Private
export const updateProfile = async(req, res, next) =>{

}

//@desc    change password
//@route    POST/api/auth/change-password
//@access       Private
export const changePassword = async(req, res, next) =>{

}