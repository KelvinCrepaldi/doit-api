import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import AppDataSource from "../data-source";

export default async () => {
  await AppDataSource.initialize()
    .then()
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const userRepository = AppDataSource.getRepository(User);
  const user = new User();

  const hashPassword = await bcrypt.hash("password", 10);

  user.email = "test@mail.com";
  user.name = "Test";
  user.password = hashPassword;

  await userRepository.save(user);

  global.token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.TOKEN_EXPIRES_TIME,
  });

  AppDataSource.destroy();
};
