import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: [3, "Name must be contain atleast 3 character"],
    maxLength: [30, "Name must be contain atleast 30 character"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Please provide a email"],
  },
  coverLetter:{
    type:String,
    required:[true,"Please provide your cover letter"],
  },
  phone:{
    type:Number,
    required:[true,"Please provide your phone"],

  },
  address:{
    type:String,
    required:[true,"Please provide your address"],
  },
  resume:{
    public_id:{
        type:String,
        required:true
    }
  },
  url:{
    type:String,
    required:true
  },
  applicationID:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:String,
        enum:["Job Seeker"],
        required:true
    }
  },
  employerID:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:String,
        enum:["Employer"],
        required:true
    }
  }
});
export const Application=mongoose.model("Application",applicationSchema)
