import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { AppError } from "../../errors/appErrors";
import {
  IDeleteTaskRequest,
  IDeleteTaskResponse,
} from "../../interfaces/tasks/deleteTask.interfaces";

const deleteTaskService = async ({
  taskId,
  userId,
}: IDeleteTaskRequest): Promise<IDeleteTaskResponse> => {
  const taskRepository = AppDataSource.getRepository(Task);

  const task = await taskRepository.findOne({
    where: { id: taskId, user: { id: userId } },
  });

  if (!task) {
    throw new AppError(
      404,
      "A informação que você está tentando excluir não existe ou você não tem permissão para executar essa operação."
    );
  }

  await taskRepository.remove(task);

  return { message: "Recurso deletado com sucesso." };
};

export default deleteTaskService;
