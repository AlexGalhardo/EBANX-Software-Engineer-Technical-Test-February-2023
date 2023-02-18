"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeAccountsRepository_1 = require("../../../factories/makeAccountsRepository");
const HttpStatusCode_1 = require("../../../utils/HttpStatusCode");
const AccountResetStateUseCase_1 = __importDefault(require("./AccountResetStateUseCase"));
class ResetStateController {
    static async handle(_, res) {
        const { success, message } = new AccountResetStateUseCase_1.default((0, makeAccountsRepository_1.makeAccountsRepository)()).execute();
        return res.status(success ? HttpStatusCode_1.HttpStatusCode.OK : HttpStatusCode_1.HttpStatusCode.BAD_REQUEST).send(message);
    }
}
exports.default = ResetStateController;
