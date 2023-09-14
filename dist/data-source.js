"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
require("reflect-metadata");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("./entities/user.entity");
const _1693895741184_createTables_1 = require("./migrations/1693895741184-createTables");
const _1694525841722_removeTextTask_1 = require("./migrations/1694525841722-removeTextTask");
const AppDataSource = process.env.NODE_ENV === "test"
    ? new typeorm_1.DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [user_entity_1.User, task_entity_1.Task],
        synchronize: true,
    })
    : new typeorm_1.DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.PGPORT || "5432"),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        synchronize: false,
        logging: true,
        entities: [user_entity_1.User, task_entity_1.Task],
        migrations: [_1693895741184_createTables_1.CreateTables1693895741184, _1694525841722_removeTextTask_1.RemoveTextTask1694525841722],
    });
exports.default = AppDataSource;
