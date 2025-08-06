import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,phone,password} = req.body
    
    if ([username, email, phone, password].some(
        (field)=> field?.trim() === ""))
    {
        throw new ApiError(404,"All fields are required")
    }
    const existedUser = User.findOne({
        $or : [{ email }]
    })
    if (existedUser){
        throw new ApiError(409, "User with email already exist")
    }

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        phone,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if( createdUser ){
        throw new ApiError(500,"Something went wrong while entering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {registerUser}