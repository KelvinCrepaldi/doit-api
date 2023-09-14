import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";
import {
  ICreateTaskRequest,
  ICreateTaskResponse,
} from "../../interfaces/tasks/createTask.interfaces";

const createTaskService = async ({
  title,
  userId,
}: ICreateTaskRequest): Promise<ICreateTaskResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const taskRepository = AppDataSource.getRepository(Task);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError(403, "User not found.");
  }

  const task = new Task();

  task.concluded = false;
  task.title = title;
  task.user = user;

  await taskRepository.save(task);

  return { message: "Atividade criada com sucesso!" };
};

export default createTaskService;
