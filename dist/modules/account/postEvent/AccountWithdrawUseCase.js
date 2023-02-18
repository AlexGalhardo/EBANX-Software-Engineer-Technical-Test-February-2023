"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountWithdrawUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute ({ origin, amount }) {
        const { httpStatusCodeResponse, message } = this.accountsRepository.withdraw(origin, amount);
        return {
            httpStatusCodeResponse,
            message,
        };
    }
}
exports.default = AccountWithdrawUseCase;
