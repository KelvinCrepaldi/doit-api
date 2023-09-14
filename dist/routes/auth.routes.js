"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_controller_1 = require("../controllers/authentication.controller");
const authRoute = (0, express_1.Router)();
authRoute.post("/login", authentication_controller_1.loginController);
authRoute.post("/signup", authentication_controller_1.singnupController);
exports.default = authRoute;
