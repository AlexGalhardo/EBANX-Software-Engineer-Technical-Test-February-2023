import { AccountEntity } from "../entities/AccountEntity";
import {
    IAccountsRepository,
    IAccountsRepositoryDepositResponse,
    IAccountsRepositoryGetBalanceResponse,
    IDefaultaccountsRepositoryResponse,
    IAccountsRepositoryTransferResponse,
    IAccountsRepositoryWithdrawResponse,
    IAccountsRepositoryGetAccountsEntitiesResponse
} from "../ports/IAccountsRepository";

const IN_MEMORY_ACCOUNTS_DATABASE: AccountEntity[] = [];

export default class InMemoryDatabaseAccountsRepository implements IAccountsRepository {
    resetState (): IDefaultaccountsRepositoryResponse {
        IN_MEMORY_ACCOUNTS_DATABASE.length = 0;
        IN_MEMORY_ACCOUNTS_DATABASE.push(new AccountEntity("300", 0))
        return { success: true, message: 'OK' }
    }

    getAccountEntity (accountId: string): AccountEntity | null {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountId) {
                return IN_MEMORY_ACCOUNTS_DATABASE[i]
            }
        }
        return null;
    }

    getAccountsEntities (accountOriginId: string, accountDestinationId: string): IAccountsRepositoryGetAccountsEntitiesResponse {
        let indexOfAccountOrigin = null;
        let indexOfAccountDestination = null;

        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountOriginId)
                indexOfAccountOrigin = i

            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountDestinationId)
                indexOfAccountDestination = i

            if (indexOfAccountOrigin && indexOfAccountDestination) {
                return {
                    accountEntityOrigin: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin],
                    AccountEntityDestination: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination]
                }
            }
        }

        return {
            accountEntityOrigin: null,
            accountEntityDestination: null
        }
    }

    createNewAccount (accountId: string, amount: number): AccountEntity {
        const newAccountEntity = new AccountEntity(accountId, amount)
        IN_MEMORY_ACCOUNTS_DATABASE.push(newAccountEntity);
        return newAccountEntity
    }

    getBalance (accountId: string): IAccountsRepositoryGetBalanceResponse {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountId) {
                return {
                    success: true,
                    data: {
                        id: IN_MEMORY_ACCOUNTS_DATABASE[i].getId,
                        balance: IN_MEMORY_ACCOUNTS_DATABASE[i].getBalance
                    }
                };
            }
        }

        return {
            success: false,
            error: `Account Id: ${accountId} not found`,
            data: 0
        };
    }

    deposit (destination: string, amount: number): IAccountsRepositoryDepositResponse {
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

    withdraw (origin: string, amount: number): IAccountsRepositoryWithdrawResponse {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === origin) {
                if (IN_MEMORY_ACCOUNTS_DATABASE[i].withdrawBalance(amount)) {
                    return {
                        success: true,
                        data: {
                            origin: {
                                id: IN_MEMORY_ACCOUNTS_DATABASE[i].getId,
                                balance: IN_MEMORY_ACCOUNTS_DATABASE[i].getBalance,
                            },
                        }
                    };
                }
                else {
                    break
                }
            }
        }

        return {
            success: false,
            error: `Account Id: ${origin} not found`,
        };
    }

    transfer (origin: string, amount: number, destination: string): IAccountsRepositoryTransferResponse {
        let indexOfAccountOrigin = null;
        let indexOfAccountDestination = null;

        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === origin)
                indexOfAccountOrigin = i

            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === destination)
                indexOfAccountDestination = i

            if (indexOfAccountOrigin && indexOfAccountDestination) {

                // aqui eu tenho que fazer uma verificação
                // usando algum algoritmo de concorrência e uma fila (FIRST IN, FIRST OUT) de 'saques em sequencia'
                // para ver se conta de origem possui saldo suficiente para fazer a transferencia
                // se saldo não for suficiente, eu não deveria conseguir fazer deposito na conta destino
                if (IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin].withdrawBalance(amount)) {

                    IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination].depositBalance(amount);

                    return {
                        success: true,
                        data: {
                            origin: {
                                id: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin].getId,
                                balance: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin].getBalance,
                            },
                            destination: {
                                id: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination].getId,
                                balance: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination].getBalance,
                            },
                        },
                    };
                }
                else {
                    break;
                }
            }
        }

        return {
            success: false,
            data: 0,
        };
    }
}
