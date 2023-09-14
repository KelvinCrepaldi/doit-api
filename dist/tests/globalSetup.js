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
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const data_source_1 = __importDefault(require("../data-source"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.default.initialize()
        .then()
        .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const user = new user_entity_1.User();
    const hashPassword = yield bcryptjs_1.default.hash("password", 10);
    user.email = "test@mail.com";
    user.name = "Test";
    user.password = hashPassword;
    yield userRepository.save(user);
    global.token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRES_TIME,
    });
    data_source_1.default.destroy();
});
