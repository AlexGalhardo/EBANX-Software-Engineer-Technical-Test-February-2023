"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountTransferUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute({ origin, amount, destination }) {
        const { accountEntityOrigin, accountEntityDestination } = this.accountsRepository.getAccountsEntities(origin, destination);
        let error = null;
        if (!accountEntityOrigin)
            error = `Account origin id ${origin} not found`;
        if (!accountEntityDestination)
            error = `Account destination id ${destination} not found`;
        if (accountEntityOrigin?.withdrawBalance(amount)) {
            if (accountEntityDestination?.depositBalance(amount)) {
                return {
                    success: true,
                    data: {
                        origin: {
                            id: accountEntityOrigin.getId,
                            balance: accountEntityOrigin.getBalance,
                        },
                        destination: {
                            id: accountEntityDestination.getId,
                            balance: accountEntityDestination.getBalance,
                        },
                    },
                };
            }
        }
        else {
            error = `Ǹot enough balance to transfer ${amount} from account id origin ${origin}`;
        }
        return {
            success: false,
            error,
            data: 0,
        };
    }
}
exports.default = AccountTransferUseCase;
