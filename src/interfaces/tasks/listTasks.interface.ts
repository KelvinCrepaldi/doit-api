import { Task } from "../../entities/task.entity";

export interface IListTaskRequest {
  userId: string;
}

export interface IListTaskResponse {
  tasks: Task[];
}
