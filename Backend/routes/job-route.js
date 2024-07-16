import express from "express";
import { getAllJobs} from "../controllers/JobController.js";
const router = express.Router();

router.get("/getAll",getAllJobs)
export default router;