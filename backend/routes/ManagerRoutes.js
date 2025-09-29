
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  updateTaskByManager,
  deleteTaskByManager,
  getAllTasksForManager,
} from "../controllers/Manager.controller.js";

const router = express.Router();

router.get("/created", authMiddleware, getAllTasksForManager);
router.put("/update/:id", authMiddleware, updateTaskByManager);
router.delete("/delete/:id", authMiddleware, deleteTaskByManager);

export default router;
