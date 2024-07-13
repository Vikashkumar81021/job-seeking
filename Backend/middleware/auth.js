import { asynchandler } from "./asyncHandler.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
export const isAuthorized = asynchandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("User not authrized", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  next();
});
