import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { AppError } from "../../errors/appErrors";
import {
  ICheckTaskRequest,
  ICheckTaskResponse,
} from "../../interfaces/tasks/checkTask.interfaces";

const checkTaskService = async ({
  taskId,
  userId,
}: ICheckTaskRequest): Promise<ICheckTaskResponse> => {
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
      "Esta tarefa já foi concluída e não pode ser marcada como concluída novamente."
    );
  }

  task.concluded = true;

  await taskRepository.save(task);

  return { message: "Tarefa modificada com sucesso!" };
};

export default checkTaskService;
