import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllUsersIncludingCurrent = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAllUsersExceptCurrent = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const users = await User.find({ _id: { $ne: currentUserId } });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const getAllUsersExceptCurrentAndAdmin = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const users = await User.find({
      _id: { $ne: currentUserId },
      role: { $ne: "Admin" },
    }).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAllUsersExceptAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const users = await User.find({ role: "Employee" }).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllEmployeesAndManagers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["Employee", "Manager"] },
    }).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching employees and managers:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
