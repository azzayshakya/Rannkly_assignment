import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUsersIncludingCurrent, 
    getUsersExcludingCurrent,
     getUsersExcludingCurrentAndAdmin,
      getUsersExcludingAdmin, 
      getEmployees, 
      getEmployeesAndManagers, 
      getEmployeesExcludeCurrent} from 
"../controllers/getUser.controllers.js";
const router = Router();

// user-related routes
router.get("/include-current", authMiddleware, getUsersIncludingCurrent); 
router.get("/exclude-current", authMiddleware, getUsersExcludingCurrent);
router.get("/exclude-admin", authMiddleware, getUsersExcludingAdmin);
router.get("/exclude-current-and-admin", authMiddleware, getUsersExcludingCurrentAndAdmin);

// employee-related routes

router.get("/employees", authMiddleware, getEmployees);

// only employee and manager can access this page 
router.get("/employee-exclude-current", authMiddleware, getEmployeesExcludeCurrent);

// only admin can acess this route
router.get("/employees-and-managers", authMiddleware, getEmployeesAndManagers);

export default router;
