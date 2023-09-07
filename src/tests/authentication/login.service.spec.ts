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

  it("Create account and response with status 200", async () => {
    const res = await request(app).post("/auth/signup").send({
      name: "User name",
      email: "email@mail.com",
      password: "password",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("email@mail.com");
  });

  it("Try create account but user already exists and response with status 409", async () => {
    const res = await request(app).post("/auth/signup").send({
      name: "User name",
      email: "email@mail.com",
      password: "password",
    });
    expect(res.statusCode).toBe(409);
  });
});
