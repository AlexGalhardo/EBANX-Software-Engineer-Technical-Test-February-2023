"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountDepositUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute({ destination, amount }) {
        let accountEntity = this.accountsRepository.getAccountEntity(destination);
        if (accountEntity) {
            accountEntity.depositBalance(amount);
            return {
                success: true,
                data: {
                    destination: {
                        id: destination,
                        balance: accountEntity.getBalance,
                    },
                },
            };
        }
        accountEntity = this.accountsRepository.createNewAccount(destination, amount);
        return {
            success: true,
            data: {
                destination: {
                    id: accountEntity.getId,
                    balance: accountEntity.getBalance,
                },
            },
        };
    }
}
exports.default = AccountDepositUseCase;
