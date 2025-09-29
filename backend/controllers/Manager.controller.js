import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const getAllTasksForManager = async (req, res) => {
  try {
    if (req.user.role !== "Manager") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Managers can access all tasks.",
      });
    }

    const tasks = await Task.find({})
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching all tasks for manager:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTaskByManager = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // if (task.createdBy !== req.user.email) {
    //   return res.status(403).json({ success: false, message: "Not authorized to update this task" });
    // }

    const { title, description, priority, dueDate, status, assignedTo } =
      req.body;

    // ✅ Optionally update assigned user if passed
    // if (assignedTo) {
    //   const newAssignee = await User.findOne({ email: assignedTo });
    //   if (!newAssignee || newAssignee.role === "Admin") {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Invalid user selected for assignment",
    //     });
    //   }
    //   // task.assignedTo = assignedTo;
    // }

    // 🟢 Update other fields
    task.assignedTo = assignedTo || task.assignedTo;
    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTaskByManager = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (task.createdBy !== req.user.email) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this task",
        });
    }

    await task.remove();

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
