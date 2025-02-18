import express from "express";
import { register, login, createAdmin } from "../Services/AuthService.js";
import { authorizeAdmin } from "../Middleware/authenticateJWT.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createadmin", authorizeAdmin, createAdmin);
export default router;
