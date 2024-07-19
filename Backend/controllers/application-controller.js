import ErrorHandler from "../middleware/error.js";
import { asynchandler } from "../middleware/asyncHandler.js";
import { Application } from "../models/application-model.js";
import cloudinary from "cloudinary";

export const employerGetallApplication = asynchandler(
  async (req, res, next) => {
    const { role } = req.user;
    if (role == "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource", 400)
      );
    }
    const { _id } = req.user;
    const application = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      application,
    });
  }
);

export const jobSeekerGetallApplication = asynchandler(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource", 400)
      );
    }
    const { _id } = req.user;
    const application = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      application,
    });
  }
);

export const jobSeekerdeleteallApplication = asynchandler(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 400));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted Successfully",
    });
  }
);

export const postApplication = asynchandler(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource", 400)
    );
  }
  if (!res.files || Object.keys(req.files).length == 0) {
    return next(new ErrorHandler("Resume file Required"));
  }
  const { resume } = req.files;
  const allowedFormat = ["image/jpg", "image/png", "image/webp"];
  if (!allowedFormat.includes(resume.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type .Please upload your resume a PNG,JPG OR WEBP Format",
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.UploadStream.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unkown cloudinary Error"
    );
    return next(new ErrorHandler("failed to upload resume", 500));
  }
  const { name, email, coverLetter, phone, address, jobID } = req.body;
  const applicationId = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobID) {
    return next(new ErrorHandler("Job not found", 404));
  }
  const Jobdetails = await jobID.findById(jobID);
  if (!Jobdetails) {
    return next(new ErrorHandler("Job not found", 404));
  }
  const employeeID = {
    user: Jobdetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicationId ||
    !resume ||
    !employeeID
  ) {
    return next(new ErrorHandler("Please fill al filled", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicationId,
    resume:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    },
    employeeID
 });
 res.status(200).json({
    success:true,
    message:"Application submitted",
    application
 })
});
