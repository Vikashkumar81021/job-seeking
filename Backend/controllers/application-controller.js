import ErrorHandler from "../middleware/error.js";
import { asynchandler } from "../middleware/asyncHandler.js";
import { Application } from "../models/application-model.js"

export const employerGetallApplication=asynchandler(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Job Seeker"){
        return next(new ErrorHandler("Job Seeker not allowed to access this resource", 400))
    }
    const {_id}=req.user
    const application=await Application.find({"employerID.user":_id})
    res.status(200).json({
        success:true,
        application
    })
})

export const jobSeekerGetallApplication=asynchandler(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(new ErrorHandler("Employer not allowed to access this resource", 400))
    }
    const {_id}=req.user
    const application=await Application.find({"applicantID.user":_id})
    res.status(200).json({
        success:true,
        application
    })
})

export const jobSeekerdeleteallApplication=asynchandler(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(new ErrorHandler("Employer not allowed to access this resource", 400))
    }
    const {id}=req.params;
    const application=await Application.findById(id)
    if(!application){
        return next(new ErrorHandler("Application not found!", 400))   
    }
    await application.deleteOne()
    res.status(200).json({
        success:true,
        message:"Application Deleted Successfully"
    })
})