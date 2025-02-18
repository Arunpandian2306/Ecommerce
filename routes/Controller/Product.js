import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProducts,
} from "../Services/ProductService.js";
import {
  authorizeAdmin,
  authenticateUser,
} from "../Middleware/authenticateJWT.js";
import upload from "../Middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/create", authorizeAdmin, upload.single("image"), createProduct);
router.put("/:id", authorizeAdmin, upload.single("image"), updateProduct);
router.delete("/:id", authorizeAdmin, deleteProduct);
router.get("/list", authorizeAdmin, listProducts);
router.get("/getProducts", authenticateUser, getProducts);

export default router;
