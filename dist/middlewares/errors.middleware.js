"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appErrors_1 = require("../errors/appErrors");
const errorsMiddleware = (err, req, res, _) => {
    if (err instanceof appErrors_1.AppError) {
        return (0, appErrors_1.handleError)(err, res);
    }
    return res.status(500).json({ message: "Internal server error" });
};
exports.default = errorsMiddleware;
