import express from "express";
import { isAuthorized } from "../middleware/auth.js";
import {employerGetallApplication,jobSeekerGetallApplication,jobSeekerdeleteallApplication}  from "../controllers/application-controller.js"
const router = express.Router();
router.get("/jobseeker/getAll",isAuthorized,jobSeekerGetallApplication)
router.get("/employer/getAll",isAuthorized,employerGetallApplication)
router.delete("/delete/:id",isAuthorized,jobSeekerdeleteallApplication)
export default router;