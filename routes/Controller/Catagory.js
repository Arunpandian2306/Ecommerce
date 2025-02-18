import express from "express";
import { authorizeAdmin } from "../Middleware/authenticateJWT.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
} from "../Services/CatagoryService.js";

const router = express.Router();

router.post("/create", authorizeAdmin, createCategory);
router.put("/:id", authorizeAdmin, updateCategory);
router.delete("/:id", authorizeAdmin, deleteCategory);
router.get("/", authorizeAdmin, listCategories);

export default router;
