import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name contain atleast 3 character"],
    maxLength: [30, "Name cannot exceed 30 character"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Please provide a email"],
  },
  phone: {
    type: Number,
    required: [true, "please provide phone  number"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "password contain at least 8 character"],
    maxLength: [32, "Password cannot exceed 32 mcharacter"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
