import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import taskFormRoutes from "./routes/TaskFormRoutes.js";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import managerRoutes from "./routes/ManagerRoutes.js";
import userRoutes from "./routes/getUserRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api", taskFormRoutes);
app.use("/employee", employeeRoutes);
app.use("/manager", managerRoutes);
app.use("/get-users", userRoutes);

export default app;
