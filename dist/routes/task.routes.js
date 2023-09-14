"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyAuthToken_middleware_1 = __importDefault(require("../middlewares/verifyAuthToken.middleware"));
const task_controller_1 = require("../controllers/task.controller");
const taskRoutes = (0, express_1.Router)();
taskRoutes.post("/", verifyAuthToken_middleware_1.default, task_controller_1.createTaskController);
taskRoutes.get("/", verifyAuthToken_middleware_1.default, task_controller_1.listTasksController);
taskRoutes.delete("/:taskId", verifyAuthToken_middleware_1.default, task_controller_1.deleteTaskController);
taskRoutes.post("/:taskId/check", verifyAuthToken_middleware_1.default, task_controller_1.checkTaskController);
taskRoutes.patch("/:taskId", verifyAuthToken_middleware_1.default, task_controller_1.updateTaskController);
exports.default = taskRoutes;
