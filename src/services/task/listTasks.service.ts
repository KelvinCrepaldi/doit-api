import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";
import {
  IListTaskRequest,
  IListTaskResponse,
} from "../../interfaces/tasks/listTasks.interface";

const listTaskService = async ({
  userId,
}: IListTaskRequest): Promise<IListTaskResponse> => {
  const taskRepository = AppDataSource.getRepository(Task);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  const tasks = await taskRepository.find({
    where: { concluded: false, user: user },
  });

  if (!tasks) {
    throw new AppError(404, "User not found.");
  }

  return { tasks };
};

export default listTaskService;
