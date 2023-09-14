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
exports.singnupController = exports.loginController = void 0;
const appErrors_1 = require("../errors/appErrors");
const login_service_1 = __importDefault(require("../services/authentication/login.service"));
const signup_service_1 = __importDefault(require("../services/authentication/signup.service"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const login = yield (0, login_service_1.default)({ email, password });
        res.status(200).send(login);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.loginController = loginController;
const singnupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const signup = yield (0, signup_service_1.default)({ name, email, password });
        res.status(200).send(signup);
    }
    catch (error) {
        if (error instanceof appErrors_1.AppError) {
            (0, appErrors_1.handleError)(error, res);
        }
    }
});
exports.singnupController = singnupController;
