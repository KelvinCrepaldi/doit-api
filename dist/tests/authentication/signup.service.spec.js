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
const user_entity_1 = require("../../entities/user.entity");
(0, globals_1.describe)("Create user account", () => {
    let connection;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    const email = "email@mail.com";
    const name = "User name";
    const password = "password";
    const hashedPassword = "$2a$10$Egd6QOzDNaZl9UINhVPs/uM5lDZXby1jFP5IExi/NvMiP.fg9xXl2";
    const requestBody = { email, name, password };
    (0, globals_1.it)("Create account to make signup tests", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.User);
            const newUser = new user_entity_1.User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = hashedPassword;
            yield userRepository.save(newUser);
            return (0, supertest_1.default)(app_1.default).post("/auth/login").send(requestBody).expect(200);
        });
    });
    (0, globals_1.it)("Login and return response with status 200", function () {
        return (0, supertest_1.default)(app_1.default).post("/auth/login").send(requestBody).expect(200);
    });
    const wrongPassword = { email, password: "wrong" };
    (0, globals_1.it)("Try login with wrong password and return response with status 404", function () {
        return (0, supertest_1.default)(app_1.default).post("/auth/login").send(wrongPassword).expect(404);
    });
    const wrongUser = { email: "wrong@mail.com", password };
    (0, globals_1.it)("Try login but user not exists and return response with status 404", function () {
        return (0, supertest_1.default)(app_1.default).post("/auth/login").send(wrongUser).expect(404);
    });
});
