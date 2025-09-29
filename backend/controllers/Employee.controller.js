import Task from "../models/task.model.js";

export const getAssignedTasks = async (req, res) => {
  try {
    if (req.user.role !== "Employee") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const tasks = await Task.find({ assignedTo: req.user.email }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCreatedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ "createdBy._id": req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching created tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTaskByCreator = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user.email.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    const { title, description, priority, dueDate, status } = req.body;

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

export const deleteTaskByCreator = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
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
