import app from "./app.js";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT,()=>{
    console.log(`Server running is PORT no ${PORT}`);
})