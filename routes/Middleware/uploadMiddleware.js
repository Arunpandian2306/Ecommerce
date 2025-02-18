import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryPkg from "cloudinary"; // ✅ Import Cloudinary properly
const cloudinary = cloudinaryPkg.v2; // ✅ Access v2 from Cloudinary's default export
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage using multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    format: async () => "png", // Set the format to 'png' (you can adjust this based on your requirements)
    public_id: (req, file) => file.originalname.split(".")[0], // Set public_id to the file's name without extension
  },
});

// Create the upload middleware
const upload = multer({ storage });

export default upload;
