"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeAccountsRepository_1 = require("../../../factories/makeAccountsRepository");
const AccountResetStateUseCase_1 = __importDefault(require("./AccountResetStateUseCase"));
class ResetStateController {
    async handle (req, res) {
        const resetStateUseCaseResponse = await new AccountResetStateUseCase_1.default((0, makeAccountsRepository_1.makeAccountsRepository)()).execute();
        return res
            .status(resetStateUseCaseResponse.httpStatusCodeResponse)
            .send(resetStateUseCaseResponse.message);
    }
}
exports.default = new ResetStateController();
