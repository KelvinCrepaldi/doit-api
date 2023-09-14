"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskController = exports.checkTaskController = exports.deleteTaskController = exports.listTasksController = exports.createTaskController = void 0;
const createTask_service_1 = __importDefault(require("../services/task/createTask.service"));
const appErrors_1 = require("../errors/appErrors");
const listTasks_service_1 = __importDefault(require("../services/task/listTasks.service"));
const deleteTask_service_1 = __importDefault(require("../services/task/deleteTask.service"));
const checkTask_service_1 = __importDefault(require("../services/task/checkTask.service"));
const updateTask_service_1 = __importDefault(require("../services/task/updateTask.service"));
const createTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const userId = req.user.id;
        const createTask = yield (0, createTask_service_1.default)({ title, userId });
        return res.status(200).send(createTask);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.createTaskController = createTaskController;
const listTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const tasks = yield (0, listTasks_service_1.default)({ userId });
        return res.status(200).send(tasks);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.listTasksController = listTasksController;
const deleteTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const userId = req.user.id;
        const tasks = yield (0, deleteTask_service_1.default)({ taskId, userId });
        return res.status(200).send(tasks);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.deleteTaskController = deleteTaskController;
const checkTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const userId = req.user.id;
        const tasks = yield (0, checkTask_service_1.default)({ taskId, userId });
        return res.status(200).send(tasks);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.checkTaskController = checkTaskController;
const updateTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const { taskId } = req.params;
        const userId = req.user.id;
        const tasks = yield (0, updateTask_service_1.default)({ title, taskId, userId });
        return res.status(200).send(tasks);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.updateTaskController = updateTaskController;
