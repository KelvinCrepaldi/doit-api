import express from "express";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import errorsMiddleware from "./middlewares/errors.middleware";
import "reflect-metadata";

import authRoute from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/task", taskRoutes);

app.use(errorsMiddleware);

export default app;
