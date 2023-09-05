export interface IUpdateTaskRequest {
  title?: string;
  message?: string;
  taskId: string;
  userId: string;
}

export interface IUpdateTaskResponse {
  message: string;
}
