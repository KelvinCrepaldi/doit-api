import { Request, Response } from "express";
import createTaskService from "../services/task/createTask.service";
import { AppError, handleError } from "../errors/appErrors";
import listTaskService from "../services/task/listTasks.service";
import deleteTaskService from "../services/task/deleteTask.service";
import checkTaskService from "../services/task/checkTask.service";
import updateTaskService from "../services/task/updateTask.service";

const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body;
    const userId = req.user.id;

    const createTask = await createTaskService({ title, message, userId });

    return res.status(200).send(createTask);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

const listTasksController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const tasks = await listTaskService({ userId });

    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const tasks = await deleteTaskService({ taskId, userId });

    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

const checkTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const tasks = await checkTaskService({ taskId, userId });

    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body;
    const { taskId } = req.params;
    const userId = req.user.id;

    const tasks = await updateTaskService({ title, message, taskId, userId });

    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export {
  createTaskController,
  listTasksController,
  deleteTaskController,
  checkTaskController,
  updateTaskController,
};
