"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountTransferUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute ({ origin, amount, destination }) {
        const { httpStatusCodeResponse, message } = this.accountsRepository.transfer(origin, amount, destination);
        return {
            httpStatusCodeResponse,
            message,
        };
    }
}
exports.default = AccountTransferUseCase;
