export interface IUpdateTaskRequest {
  title?: string;
  taskId: string;
  userId: string;
}

export interface IUpdateTaskResponse {
  message: string;
}
