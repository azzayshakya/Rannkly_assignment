import { Router } from "express";
import {
  getAllEmployees,
  getAllEmployeesAndManagers,
  
  getAllUsersExceptAdmin,
  getAllUsersExceptCurrent,
  getAllUsersExceptCurrentAndCurrent,
  getAllUsersIncludingCurrent,
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";
import validateRegistration from "../middleware/validateRegistration.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateLogin from "../middleware/validateUserLogin.js";
const router = Router();

router.post("/create-account", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/get-users-except-current-admin", authMiddleware, getAllUsersExceptCurrentAndCurrent);
router.get("/get-users-except-current", authMiddleware, getAllUsersExceptCurrent);
router.get("/get-users-including-current", authMiddleware, getAllUsersIncludingCurrent);
router.get("/get-users-except-admin", authMiddleware, getAllUsersExceptAdmin);


router.get(
  "/employees",
  authMiddleware,
  //  authorizeRoles("Admin", "Manager"),
  getAllEmployees
);
router.get(
  "/employees-managers",
  authMiddleware,
  //  authorizeRoles("Admin"),
  getAllEmployeesAndManagers
);

export default router;
