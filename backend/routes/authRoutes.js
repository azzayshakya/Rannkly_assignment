import { Router } from "express";

import validateRegistration from "../middleware/validateRegistration.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateLogin from "../middleware/validateUserLogin.js";
import { getProfile, loginUser, registerUser } from "../controllers/auth.controller.js";
const router = Router();

router.post("/create-account", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile", authMiddleware, getProfile);



export default router;
