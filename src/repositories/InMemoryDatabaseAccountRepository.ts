import { AccountEntity } from "../entities/AccountEntity";
import {
    IAccountRepository,
    IAccountRepositoryDepositResponse,
    IAccountRepositoryGetBalanceResponse,
    IDefaultAccountRepositoryResponse,
    typeTransferMethodResponse,
    IAccountRepositoryWithdrawResponse,
} from "../ports/IAccountRepository";

const IN_MEMORY_ACCOUNTS_DATABASE: AccountEntity[] = [];

export default class InMemoryDatabaseAccountRepository implements IAccountRepository {
    resetState (): IDefaultAccountRepositoryResponse {
        IN_MEMORY_ACCOUNTS_DATABASE.length = 0;
        IN_MEMORY_ACCOUNTS_DATABASE.push(new AccountEntity("300", 0))
        return { success: true }
    }

    getBalance (accountId: string): IAccountRepositoryGetBalanceResponse {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountId) {
                return {
                    success: true,
                    data: {
                        account_id: IN_MEMORY_ACCOUNTS_DATABASE[i].getId,
                        balance: IN_MEMORY_ACCOUNTS_DATABASE[i].getBalance
                    }
                };
            }
        }

        return {
            success: false,
            error: `Account Id: ${accountId} not found`
        };
    }

    deposit (destination: string, amount: number): IAccountRepositoryDepositResponse {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === destination) {
                IN_MEMORY_ACCOUNTS_DATABASE[i].depositBalance(amount);

                return {
                    success: true,
                    data: {
                        destination: {
                            id: destination,
                            balance: IN_MEMORY_ACCOUNTS_DATABASE[i].getBalance,
                        },
                    }
                };
            }
        }

        const newAccount = new AccountEntity(destination, amount)

        IN_MEMORY_ACCOUNTS_DATABASE.push(newAccount);

        return {
            success: true,
            data: {
                destination: {
                    id: newAccount.getId,
                    balance: newAccount.getBalance,
                },
            }
        };
    }

    withdraw (origin: string, amount: number): IAccountRepositoryWithdrawResponse {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].id === origin) {
                IN_MEMORY_ACCOUNTS_DATABASE[i].balance -= amount;

                return {
                    httpStatusCodeResponse: HTTP_STATUS_CODE_CREATED,
                    message: {
                        origin: {
                            id: origin,
                            balance: IN_MEMORY_ACCOUNTS_DATABASE[i].balance,
                        },
                    },
                };
            }
        }

        return {
            httpStatusCodeResponse: HTTP_STATUS_CODE_NOT_FOUND,
            message: 0,
        };
    }

    transfer (origin: string, amount: number, destination: string): typeTransferMethodResponse {
        const indexOfAccountOrigin = IN_MEMORY_ACCOUNTS_DATABASE.findIndex(
            (account) => account.id === origin,
        );

        const indexOfAccountDestination = IN_MEMORY_ACCOUNTS_DATABASE.findIndex(
            (account) => account.id === destination,
        );

        if (indexOfAccountOrigin >= 0 && indexOfAccountDestination >= 0) {
            IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin].balance -= amount;
            IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination].balance += amount;

            return {
                httpStatusCodeResponse: HTTP_STATUS_CODE_CREATED,
                message: {
                    origin: {
                        id: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin].id,
                        balance: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin].balance,
                    },
                    destination: {
                        id: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination].id,
                        balance: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination].balance,
                    },
                },
            };
        }

        return {
            httpStatusCodeResponse: HTTP_STATUS_CODE_NOT_FOUND,
            message: 0,
        };
    }
}
