import { Router } from "express";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import {
  createTaskController,
  listTasksController,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", verifyAuthTokenMiddleware, createTaskController);
taskRoutes.get("/", verifyAuthTokenMiddleware, listTasksController);

export default taskRoutes;
