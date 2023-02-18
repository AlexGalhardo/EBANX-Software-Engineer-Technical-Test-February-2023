"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountGetBalanceUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute(accountId) {
        const accountEntity = this.accountsRepository.getAccountEntity(accountId);
        if (accountEntity) {
            return {
                success: true,
                data: accountEntity.getBalance,
            };
        }
        return {
            success: false,
            error: `Account Id: ${accountId} not found`,
            data: 0,
        };
    }
}
exports.default = AccountGetBalanceUseCase;
