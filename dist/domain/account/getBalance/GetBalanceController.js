"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeAccountsRepository_1 = require("../../../factories/makeAccountsRepository");
const HttpStatusCode_1 = require("../../../utils/HttpStatusCode");
const AccountGetBalanceUseCase_1 = __importDefault(require("./AccountGetBalanceUseCase"));
class GetBalanceController {
    static async handle(req, res) {
        const { account_id } = req.query;
        const { success, data } = await new AccountGetBalanceUseCase_1.default((0, makeAccountsRepository_1.makeAccountsRepository)()).execute(account_id);
        return res.status(success ? HttpStatusCode_1.HttpStatusCode.OK : HttpStatusCode_1.HttpStatusCode.NOT_FOUND).json(data);
    }
}
exports.default = GetBalanceController;
