import express from "express";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import errorsMiddleware from "./middlewares/errors.middleware";
import "reflect-metadata";

import authRoute from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/task", taskRoutes);
app.use("/", (req, res) => {
  res.status(200).json("ok");
});

app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
