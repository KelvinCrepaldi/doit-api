import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";
import { Task } from "./entities/task.entity";
import { User } from "./entities/user.entity";
import { CreateTables1693895741184 } from "./migrations/1693895741184-createTables";

const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [User, Task],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.PGPORT || "5432"),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        synchronize: false,
        logging: true,
        entities: [User, Task],
        migrations: [CreateTables1693895741184],
      });

export default AppDataSource;
