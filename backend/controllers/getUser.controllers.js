import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const getUsersIncludingCurrent = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getUsersExcludingCurrent = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Users excluding current fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users excluding current:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users excluding current",
    });
  }
};

export const getUsersExcludingCurrentAndAdmin = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const users = await User.find({
      _id: { $ne: currentUserId },
      role: { $ne: "Admin" },
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Users excluding current and admin fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users excluding current and admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users excluding current and admin",
    });
  }
};

export const getUsersExcludingAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Users excluding admin fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users excluding admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users excluding admin",
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const users = await User.find({ role: "Employee" }).select("-password");

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

export const getEmployeesExcludeCurrent = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (currentUser.role === "Employee") {
      const users = await User.find({
        _id: { $ne: currentUserId },
        role: { $in: ["Employee"] },
      }).select("-password");

      res.status(200).json({
        success: true,
        message: "Employees fetched successfully",
        data: users,
      });
    } else {
      const users = await User.find({
        role: { $in: ["Employee"] },
      }).select("-password");

      res.status(200).json({
        success: true,
        message: "Employees fetched successfully",
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

export const getEmployeesAndManagers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["Employee", "Manager"] },
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Employees and managers fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching employees and managers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees and managers",
    });
  }
};
