import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

describe("Task routes: create, update, delete, list and check", () => {
  let connection: DataSource;
  let token = "";
  let taskId = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const res = await request(app).post("/auth/signup").send({
      name: "User name",
      email: "email@mail.com",
      password: "password",
    });

    token = res.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Create task and response with status 200", async () => {
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "title",
        message: "message of task!",
      });
    expect(res.statusCode).toBe(200);
  });

  it("Try create task without authorization token and response with status 400", async () => {
    const res = await request(app).post("/task").send({
      title: "title",
      message: "message of task!",
    });
    expect(res.statusCode).toBe(400);
  });

  it("Try create task with invalid authorization token and response with status 401", async () => {
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer x`)
      .send({
        title: "title",
        message: "message of task!",
      });
    expect(res.statusCode).toBe(401);
  });

  it("List all task of user and return status code 200", async () => {
    const res = await request(app)
      .get("/task")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    taskId = res.body.tasks[0].id;
  });

  it("Update task and return status code 200", async () => {
    const res = await request(app)
      .patch(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "modify",
      });
    expect(res.statusCode).toBe(200);
  });

  it("Check task of user and return status code 200", async () => {
    const res = await request(app)
      .patch(`/task/${taskId}/check`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("try check task already checked and return status code 403", async () => {
    const res = await request(app)
      .patch(`/task/${taskId}/check`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });

  it("Try update task already concluded and return status 403", async () => {
    const res = await request(app)
      .patch(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "modify",
      });
    expect(res.statusCode).toBe(403);
  });

  it("Delete task of user and return status code 200", async () => {
    const res = await request(app)
      .delete(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("Try delete task that not exist and return status code 404", async () => {
    const res = await request(app)
      .delete(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it("try check task that not exist and return status code 404", async () => {
    const res = await request(app)
      .patch(`/task/${taskId}/check`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it("Try update task that not exist and return status 404", async () => {
    const res = await request(app)
      .patch(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "modify",
      });
    expect(res.statusCode).toBe(404);
  });
});
