import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";
import {
  IListTaskRequest,
  IListTaskResponse,
} from "../../interfaces/tasks/listTasks.interface";

const listTaskService = async ({
  userId,
}: IListTaskRequest): Promise<IListTaskResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["tasks"],
  });

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  return { tasks: user.tasks };
};

export default listTaskService;
