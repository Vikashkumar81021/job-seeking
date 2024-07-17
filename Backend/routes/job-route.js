import express from "express";
import { deleteJob, getAllJobs, getMyjob, postJob, update} from "../controllers/JobController.js";
import { isAuthorized } from "../middleware/auth.js";
const router = express.Router();

router.get("/getAll",getAllJobs)
router.post("/post",isAuthorized,postJob)
router.post("/getmyjobs",isAuthorized,getMyjob)
router.put("/update/:id",isAuthorized,update)
router.delete("/delete/:id",isAuthorized,deleteJob)
export default router;