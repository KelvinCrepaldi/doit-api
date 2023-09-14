"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const data_source_1 = __importDefault(require("../../data-source"));
(0, globals_1.describe)("Task routes: create, update, delete, list and check", () => {
    let connection;
    let token = "";
    let taskId = "";
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        const res = yield (0, supertest_1.default)(app_1.default).post("/auth/signup").send({
            name: "User name",
            email: "email@mail.com",
            password: "password",
        });
        token = res.body.token;
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    (0, globals_1.it)("Create task and response with status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/task")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "title",
            message: "message of task!",
        });
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }));
    (0, globals_1.it)("Try create task without authorization token and response with status 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/task").send({
            title: "title",
            message: "message of task!",
        });
        (0, globals_1.expect)(res.statusCode).toBe(400);
    }));
    (0, globals_1.it)("Try create task with invalid authorization token and response with status 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/task")
            .set("Authorization", `Bearer x`)
            .send({
            title: "title",
            message: "message of task!",
        });
        (0, globals_1.expect)(res.statusCode).toBe(401);
    }));
    (0, globals_1.it)("List all task of user and return status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/task")
            .set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(res.statusCode).toBe(200);
        taskId = res.body.tasks[0].id;
    }));
    (0, globals_1.it)("Update task and return status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/task/${taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "modify",
        });
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }));
    (0, globals_1.it)("Check task of user and return status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/task/${taskId}/check`)
            .set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }));
    (0, globals_1.it)("try check task already checked and return status code 403", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/task/${taskId}/check`)
            .set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(res.statusCode).toBe(403);
    }));
    (0, globals_1.it)("Try update task already concluded and return status 403", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/task/${taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "modify",
        });
        (0, globals_1.expect)(res.statusCode).toBe(403);
    }));
    (0, globals_1.it)("Delete task of user and return status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/task/${taskId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }));
    (0, globals_1.it)("Try delete task that not exist and return status code 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/task/${taskId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(res.statusCode).toBe(404);
    }));
    (0, globals_1.it)("try check task that not exist and return status code 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/task/${taskId}/check`)
            .set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(res.statusCode).toBe(404);
    }));
    (0, globals_1.it)("Try update task that not exist and return status 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/task/${taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "modify",
        });
        (0, globals_1.expect)(res.statusCode).toBe(404);
    }));
});
