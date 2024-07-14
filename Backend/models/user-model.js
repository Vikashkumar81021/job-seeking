import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your Name"],
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
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash our password Pre-save middleware to hash the password if it is modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//compare Password
userSchema.methods.comparePassword=async function(plainPassword){
  return await bcrypt.compare(plainPassword,this.password)
}

//Generate jwt token for authorization
userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    userName:this.userName
  },
  process.env.JWT_SECRET_KEY,
  {
   expiresIn: process.env.JWT_EXPIRE
  }
  )
}


const User = mongoose.model("User", userSchema);
export default User;
