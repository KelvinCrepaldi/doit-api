import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ISignupRequest,
  ISignupResponse,
} from "../../interfaces/user/signup.interfaces";

const signupService = async ({
  email,
  name,
  password,
}: ISignupRequest): Promise<ISignupResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({ where: { email: email } });

  if (findUser) {
    throw new AppError(
      409,
      "O usuário com o e-mail fornecido já existe em nosso sistema."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();

  user.email = email;
  user.name = name;
  user.password = hashedPassword;

  await userRepository.save(user);

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.TOKEN_EXPIRES_TIME,
  });
  return { token, user: { name: user.name, email: user.email } };
};

export default signupService;
