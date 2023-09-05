import { Router } from "express";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import {
  checkTaskController,
  createTaskController,
  deleteTaskController,
  listTasksController,
  updateTaskController,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", verifyAuthTokenMiddleware, createTaskController);
taskRoutes.get("/", verifyAuthTokenMiddleware, listTasksController);
taskRoutes.delete("/:taskId", verifyAuthTokenMiddleware, deleteTaskController);
taskRoutes.patch(
  "/:taskId/check",
  verifyAuthTokenMiddleware,
  checkTaskController
);
taskRoutes.patch("/:taskId", verifyAuthTokenMiddleware, updateTaskController);

export default taskRoutes;
