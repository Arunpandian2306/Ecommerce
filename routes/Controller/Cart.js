import express from "express";
import { authenticateUser } from "../Middleware/authenticateJWT.js";
import {
  createCart,
  deleteCart,
  viewCart,
  updateCartQuantity,
} from "../Services/CartService.js";

const router = express.Router();

router.post("/create", authenticateUser, createCart);
router.delete("/:cartId", authenticateUser, deleteCart);
router.get("/:userId", authenticateUser, viewCart);
router.put("/update", authenticateUser, updateCartQuantity);
export default router;
