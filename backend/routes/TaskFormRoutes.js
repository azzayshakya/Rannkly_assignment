import express from "express";
import { createTask } from "../controllers/taskForm.controllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-task", authMiddleware,createTask);

export default router;
