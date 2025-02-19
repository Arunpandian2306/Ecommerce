import express from "express";
import { authorizeAdmin } from "../Middleware/authenticateJWT.js";
import { createCart, deleteCart, viewCart } from "../Services/CartService.js";

const router = express.Router();

router.post("/create", authorizeAdmin, createCart);
router.delete("/:cartId", authorizeAdmin, deleteCart);
router.get("/:userId", authorizeAdmin, viewCart);

export default router;
