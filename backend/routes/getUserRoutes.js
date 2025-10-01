import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUsersIncludingCurrent, 
    getUsersExcludingCurrent,
     getUsersExcludingCurrentAndAdmin,
      getUsersExcludingAdmin, 
      getEmployees, 
      getEmployeesAndManagers } from 
"../controllers/getUser.controllers.js";
const router = Router();

// user-related routes
router.get("/include-current", authMiddleware, getUsersIncludingCurrent); 
router.get("/exclude-current", authMiddleware, getUsersExcludingCurrent);
router.get("/exclude-admin", authMiddleware, getUsersExcludingAdmin);
router.get("/exclude-current-and-admin", authMiddleware, getUsersExcludingCurrentAndAdmin);

// employee-related routes
router.get("/employees", authMiddleware, getEmployees);
router.get("/employees-and-managers", authMiddleware, getEmployeesAndManagers);

export default router;
