import { Router } from "express";
import {
  loginController,
  singnupController,
} from "../controllers/authentication.controller";

const authRoute = Router();

authRoute.post("/login", loginController);
authRoute.post("/signup", singnupController);

export default authRoute;
