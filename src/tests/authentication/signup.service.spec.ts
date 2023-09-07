import { describe, beforeAll, afterAll, it } from "@jest/globals";

import request from "supertest";
import app from "../../app";

import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

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

  const email = "email@mail.com";
  const name = "User name";
  const password = "password";
  const hashedPassword =
    "$2a$10$Egd6QOzDNaZl9UINhVPs/uM5lDZXby1jFP5IExi/NvMiP.fg9xXl2";

  const requestBody = { email, name, password };

  it("Create account to make signup tests", async function () {
    const userRepository = AppDataSource.getRepository(User);

    const newUser = new User();

    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedPassword;

    await userRepository.save(newUser);

    return request(app).post("/auth/login").send(requestBody).expect(200);
  });

  it("Login and return response with status 200", function () {
    return request(app).post("/auth/login").send(requestBody).expect(200);
  });

  const wrongPassword = { email, password: "wrong" };

  it("Try login with wrong password and return response with status 404", function () {
    return request(app).post("/auth/login").send(wrongPassword).expect(404);
  });

  const wrongUser = { email: "wrong@mail.com", password };

  it("Try login but user not exists and return response with status 404", function () {
    return request(app).post("/auth/login").send(wrongUser).expect(404);
  });
});
