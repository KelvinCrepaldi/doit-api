import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";
import {
  ILoginRequest,
  ILoginResponse,
} from "../../interfaces/user/login.interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginService = async ({
  email,
  password,
}: ILoginRequest): Promise<ILoginResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError(
      404,
      "O usuário com o e-mail fornecido não existe em nosso sistema. Verifique suas credenciais ou crie uma nova conta."
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(
      404,
      "A senha fornecida não corresponde à senha associada a este usuário. Verifique suas credenciais e tente novamente."
    );
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.TOKEN_EXPIRES_TIME,
  });

  return { token, user: { name: user.name, email: user.email } };
};

export default loginService;
