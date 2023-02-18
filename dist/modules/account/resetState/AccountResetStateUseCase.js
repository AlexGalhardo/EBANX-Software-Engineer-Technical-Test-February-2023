"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../shared/constants");
class AccountResetStateUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute () {
        this.accountsRepository.resetStateBeforeStartingTests();
        return { httpStatusCodeResponse: constants_1.HTTP_STATUS_CODE_OK, message: "OK" };
    }
}
exports.default = AccountResetStateUseCase;
