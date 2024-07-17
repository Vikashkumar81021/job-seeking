import userModel from "../models/user-model.js";
import { asynchandler } from "../middleware/asyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import { sendToken } from "../utils/jwtToken.js";
export const register = asynchandler(async (req, res, next) => {
  try {
    
    const { name, email, password, phone, role } = req.body;
  
    if (
      [name, email, password, phone, role].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return next(
        new ErrorHandler("All fields are required and must not be empty.", 400)
      );
    }

    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user = await userModel.create({
      name,
      email,
      password,
      phone,
      role,
    });
   
    sendToken(user, 200, res, "User Register sucessfully");
  } catch (error) {
    next(error);
  }
});




export const login = asynchandler(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(new ErrorHandler("Invalid credentials", 400)); // Use 400 for bad request
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    if (user.role !== role) {
      return next(new ErrorHandler("User with the role is not found", 404)); // Specify status code
    }

    sendToken(user,200, res,  "User login successfully!");

  } catch (error) {
    next(error); 
  }
});

export const logout=asynchandler(async(req,res,next)=>{
  try {
    res.cookie('token',"",{
      expires: new Date(Date.now()),
       httpOnly: true
    }).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error)
  }
})