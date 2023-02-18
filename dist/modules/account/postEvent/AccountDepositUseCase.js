"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountDepositUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute ({ destination, amount }) {
        const { httpStatusCodeResponse, message } = this.accountsRepository.deposit(destination, amount);
        return {
            httpStatusCodeResponse,
            message,
        };
    }
}
exports.default = AccountDepositUseCase;
