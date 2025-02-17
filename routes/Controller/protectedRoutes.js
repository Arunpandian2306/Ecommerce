import express from "express";
import {
  authenticateUser,
  authorizeAdmin,
} from "../Middleware/authenticateJWT.js";

const router = express.Router();

router.get("/admin/dashboard", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

router.get("/customer/dashboard", authenticateUser, (req, res) => {
  res.json({ message: "Welcome to Customer Dashboard" });
});

export default router;
