import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide job title"],
    minLength: [3, "job title must contain at least 3 character"],
    maxLength: [50, "job tittle cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "please provide job description"],
    minLength: [3, "job title must contain at least 3 character"],
    maxLength: [350, "job tittle cannot exceed 350 characters"],
  },
  category: {
    type: String,
    required: [true, "job category is required "],
  },
  country: {
    type: String,
    required: [true, "job country is required"],
  },
  city: {
    type: String,
    required: [true, "job city is required"],
  },
  location: {
    type: String,
    required: [true, "please provide exact job location"],
    minLength: [50, "job title must contain at least 50 character"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "fixed salary contain at least 4 digit"],
    maxLength: [9, "fixed salary cannot exceed 9 digit"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "salary from must contain 4 digit"],
    maxLength: [9, "salary from cannot exceed 9 digit"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "salary to must contain 4 digit"],
    maxLength: [9, "salary to cannot exceed 9 digit"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
