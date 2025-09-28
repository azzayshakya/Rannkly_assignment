import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { updateUserRole } from "../controllers/admin.controllers.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.patch("/users/:id/role", authMiddleware, updateUserRole);

export default router;
