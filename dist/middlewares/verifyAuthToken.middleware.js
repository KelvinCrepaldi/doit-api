"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const verifyAuthTokenMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json("Missing authorization token.");
    }
    const splitToken = token.split(" ")[1];
    jsonwebtoken_1.default.verify(splitToken, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid authorization token.",
            });
        }
        req.user = {
            id: decoded.id,
        };
        next();
    });
};
exports.default = verifyAuthTokenMiddleware;
