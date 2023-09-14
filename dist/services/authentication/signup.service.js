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
const data_source_1 = __importDefault(require("../../data-source"));
const user_entity_1 = require("../../entities/user.entity");
const appErrors_1 = require("../../errors/appErrors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupService = ({ email, name, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const findUser = yield userRepository.findOne({ where: { email: email } });
    if (findUser) {
        throw new appErrors_1.AppError(409, "O usuário com o e-mail fornecido já existe em nosso sistema.");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new user_entity_1.User();
    user.email = email;
    user.name = name;
    user.password = hashedPassword;
    yield userRepository.save(user);
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRES_TIME,
    });
    return { token, user: { name: user.name, email: user.email } };
});
exports.default = signupService;
