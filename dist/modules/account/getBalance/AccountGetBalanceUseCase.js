"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountGetBalanceUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute ({ account_id }) {
        const { httpStatusCodeResponse, message } = this.accountsRepository.getBalance(account_id);
        return {
            httpStatusCodeResponse,
            message,
        };
    }
}
exports.default = AccountGetBalanceUseCase;
