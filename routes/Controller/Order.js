import express from "express";
import { placeOrder, viewOrderHistory } from "../Services/OrderService.js";
import { authenticateUser } from "../Middleware/authenticateJWT.js";
const router = express.Router();

router.post("/place", authenticateUser, placeOrder);
router.get("/history/:userId", authenticateUser, viewOrderHistory);

export default router;
