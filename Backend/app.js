import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoute from "./routes/user-route.js"
import jobRoute from "./routes/job-route.js"
import applicationRoute from "./routes/application-route.js"
import connectDB from  "./database/db.js"
import { errorMiddleware } from "./middleware/error.js";

const app = express();
config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./dir",
  })
);
app.use("/api/v1/user",userRoute)
app.use("/apv/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
connectDB()
app.use(errorMiddleware)
export default app;
