import ErrorHandler from "../middleware/error.js";
import { asynchandler } from "../middleware/asyncHandler.js";
import Job from "../models/job-model.js";

export const getAllJobs = asynchandler(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = asynchandler(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(
      ErrorHandler("Job Seeker not allowed to access this resource", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(ErrorHandler("Please Provide full job Details", 400));
  }
  if ((!salaryTo || !salaryFrom) && !fixedSalary) {
    return next(
      ErrorHandler("Please either Provide salary or ranged salary  ")
    );
  }
  if (salaryTo && salaryFrom && fixedSalary) {
    return next(
      ErrorHandler("Cannot  enter fixed salary and ranged salary together  ")
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  });
});

export const getMyjob = asynchandler(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(
      ErrorHandler("Job Seeker not allowed to access this resource", 400)
    );
  }
  const myJob = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJob,
  });
});

export const update = asynchandler(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(
      ErrorHandler("Job Seeker not allowed to access this resource", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(ErrorHandler("Job Not found", 404));
  }
  job=await Job.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true,
    message:"Job Update Successfully",
    job
  })
});

export const deleteJob=asynchandler(async(req,res,next)=>{
    const { role } = req.user;
    if (role == "Job Seeker") {
      return next(
        ErrorHandler("Job Seeker not allowed to access this resource", 400)
      );
    }
    const { id } = req.params;  
    let job = await Job.findById(id);
    if (!job) {
        return next(ErrorHandler("Job Not found", 404));
      }
      await Job.deleteOne()
})