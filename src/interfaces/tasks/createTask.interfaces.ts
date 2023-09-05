import { Task } from "../../entities/task.entity";

export interface ICreateTaskRequest {
  title: string;
  message: string;
  userId: string;
}

export interface ICreateTaskResponse {
  message: string;
}
