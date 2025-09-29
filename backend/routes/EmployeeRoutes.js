import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAssignedTasks,
  getCreatedTasks,
  updateTaskByCreator,
  deleteTaskByCreator,
} from "../controllers/Employee.controller.js";

const router = express.Router();

router.get("/assigned", authMiddleware, getAssignedTasks);

router.get("/created", authMiddleware, getCreatedTasks);

router.put("/update/:id", authMiddleware, updateTaskByCreator);

router.delete("/delete/:id", authMiddleware, deleteTaskByCreator);

export default router;
