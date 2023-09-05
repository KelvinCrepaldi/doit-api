import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appErrors";
import loginService from "../services/authentication/login.service";
import signupService from "../services/authentication/signup.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await loginService({ email, password });

    res.status(200).send(login);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

const singnupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const signup = await signupService({ name, email, password });

    res.status(200).send(signup);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export { loginController, singnupController };
