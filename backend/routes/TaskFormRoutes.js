import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasksForUser,
  getAllTasks,
} from "../controllers/taskForm.controllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-task", authMiddleware, createTask);

router.get("/my-tasks", authMiddleware, getTasksForUser);

router.get(
  "/all-tasks",
//   authMiddleware,
  //   authorizeRoles("Manager", "Admin"),
  getAllTasks
);

router.patch("/update-task/:id", authMiddleware, updateTask);

router.delete(
  "/delete-task/:id",
  authMiddleware,
  //   authorizeRoles("Manager", "Admin"),
  deleteTask
);

export default router;
