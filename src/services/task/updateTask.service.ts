import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { AppError } from "../../errors/appErrors";
import {
  IUpdateTaskRequest,
  IUpdateTaskResponse,
} from "../../interfaces/tasks/updateTask.interfaces";

const updateTaskService = async ({
  title,
  taskId,
  userId,
}: IUpdateTaskRequest): Promise<IUpdateTaskResponse> => {
  const taskRepository = AppDataSource.getRepository(Task);

  const task = await taskRepository.findOne({
    where: { id: taskId, user: { id: userId } },
  });

  if (!task) {
    throw new AppError(
      404,
      "A informação que você está tentando modificar não existe ou você não tem permissão para executar essa operação."
    );
  }

  if (task.concluded === true) {
    throw new AppError(
      403,
      "Esta tarefa já foi concluída e não pode ser modificada."
    );
  }

  title && (task.title = title);

  await taskRepository.save(task);

  return { message: "Tarefa modificada com sucesso!" };
};

export default updateTaskService;
