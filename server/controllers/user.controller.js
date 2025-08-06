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
    const existedUser = await User.findOne({
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
    if( !createdUser ){
        throw new ApiError(500,"Something went wrong while entering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {registerUser}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login input:", email, password);
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("Password valid:", isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const userWithoutPassword = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(200, userWithoutPassword, "Login successful")
  );
});

export { loginUser };
