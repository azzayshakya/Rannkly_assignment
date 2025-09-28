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
