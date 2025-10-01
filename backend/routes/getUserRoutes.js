import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllEmployees, getAllEmployeesAndManagers, getAllUsersExceptAdmin, getAllUsersExceptCurrent, getAllUsersExceptCurrentAndAdmin, getAllUsersIncludingCurrent } from "../controllers/getUser.controllers.js";
const router = Router();
// user-related routes
router.get("/include-current", authMiddleware, getAllUsersIncludingCurrent); 
router.get("/exclude-current", authMiddleware, getAllUsersExceptCurrent);
router.get("/exclude-admin", authMiddleware, getAllUsersExceptAdmin);
router.get("/exclude-current-and-admin", authMiddleware, getAllUsersExceptCurrentAndAdmin);

// employee-related routes
router.get("/employees", authMiddleware, getAllEmployees);
router.get("/employees-and-managers", authMiddleware, getAllEmployeesAndManagers);

export default router;
