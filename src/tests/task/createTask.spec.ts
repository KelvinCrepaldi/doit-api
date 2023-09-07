import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

describe("Create an user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Create task and response with status 200", async () => {
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        title: "title",
        message: "message of task!",
      });
    expect(res.statusCode).toBe(global.token);
  });
});
