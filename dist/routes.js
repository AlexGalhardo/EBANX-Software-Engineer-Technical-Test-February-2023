"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetBalanceController_1 = __importDefault(require("./domain/account/getBalance/GetBalanceController"));
const PostEventController_1 = __importDefault(require("./domain/account/postEvent/PostEventController"));
const ResetStateController_1 = __importDefault(require("./domain/account/resetState/ResetStateController"));
exports.default = (0, express_1.Router)()
    .post("/reset", ResetStateController_1.default.handle)
    .post("/event", PostEventController_1.default.handle)
    .get("/balance", GetBalanceController_1.default.handle);
