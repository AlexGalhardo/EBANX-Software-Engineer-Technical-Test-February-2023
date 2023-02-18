"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeAccountsRepository_1 = require("../../../factories/makeAccountsRepository");
const AccountGetBalanceUseCase_1 = __importDefault(require("./AccountGetBalanceUseCase"));
class GetBalanceController {
    async handle (req, res) {
        const { account_id } = req.query;
        const getBalanceResponse = await new AccountGetBalanceUseCase_1.default((0, makeAccountsRepository_1.makeAccountsRepository)()).execute({ account_id });
        return res
            .status(getBalanceResponse.httpStatusCodeResponse)
            .json(getBalanceResponse.message);
    }
}
exports.default = new GetBalanceController();
