"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountWithdrawUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute({ origin, amount }) {
        const accountEntity = this.accountsRepository.getAccountEntity(origin);
        if (accountEntity?.withdrawBalance(amount)) {
            return {
                success: true,
                data: {
                    origin: {
                        id: accountEntity?.getId,
                        balance: accountEntity?.getBalance,
                    },
                },
            };
        }
        return {
            success: false,
            error: accountEntity
                ? `Not enough balance to withdraw ${amount}`
                : `Account Id: ${origin} not found`,
            data: 0
        };
    }
}
exports.default = AccountWithdrawUseCase;
