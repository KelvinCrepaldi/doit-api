import { Request, Response } from "express";
import createTaskService from "../services/task/createTask.service";
import { AppError, handleError } from "../errors/appErrors";
import listTaskService from "../services/task/listTasks.service";

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

export { createTaskController, listTasksController };
