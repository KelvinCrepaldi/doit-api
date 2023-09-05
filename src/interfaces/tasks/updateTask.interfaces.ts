export interface IUpdateTaskRequest {
  title?: string;
  message?: string;
  taskId: string;
}

export interface IUpdateTaskResponse {
  message: string;
}
