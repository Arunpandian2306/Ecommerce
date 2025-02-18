import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
} from "../Services/ProductService.js";
// import { authenticateUser, authorizeAdmin } from "../Middleware/authenticateJWT.js";
import upload from "../Middleware/uploadMiddleware.js";

const router = express.Router();

// Apply authenticateUser before authorizeAdmin
router.post("/create", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/list", listProducts);

export default router;
