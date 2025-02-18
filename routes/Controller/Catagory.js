import express from "express";
import { authenticateJWT, isAdmin } from "../middleware/authMiddleware";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
} from "../controllers/categoryController";

const router = express.Router();

router.post("/", authenticateJWT, isAdmin, createCategory);
router.put("/:id", authenticateJWT, isAdmin, updateCategory);
router.delete("/:id", authenticateJWT, isAdmin, deleteCategory);
router.get("/", authenticateJWT, isAdmin, listCategories);

export default router;
