import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;

    if (!title || !description || !priority || !dueDate || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const userToAssign = await User.findOne({ email: assignedTo });

    if (!userToAssign) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
      assignedTo: userToAssign._id,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTasksForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let tasks;

    if (role === "Employee") {
      tasks = await Task.find({
        $or: [{ assignedTo: userId }, { createdBy: userId }],
      }).populate("assignedTo createdBy", "name email");
    } else {
      tasks = await Task.find().populate("assignedTo createdBy", "name email");
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignedTo createdBy",
      "name email"
    );
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (user.role === "Employee") {
      const isCreator = task.createdBy.toString() === user.id;
      const isAssignee = task.assignedTo.toString() === user.id;

      if (!isCreator && !isAssignee) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }

      const allowedFields = isCreator
        ? ["title", "description", "priority", "dueDate", "status"]
        : ["priority", "status"];

      Object.keys(updates).forEach((key) => {
        if (!allowedFields.includes(key)) delete updates[key];
      });
    }

    Object.assign(task, updates);
    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
