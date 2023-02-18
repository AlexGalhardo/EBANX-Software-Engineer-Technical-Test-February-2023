import { AccountEntity } from "../entities/AccountEntity";
import {
    IAccountsRepository,
    IDefaultaccountsRepositoryResponse,
    IAccountsRepositoryGetAccountsEntitiesResponse,
} from "../ports/IAccountsRepository";

const IN_MEMORY_ACCOUNTS_DATABASE: AccountEntity[] = [];

export default class InMemoryDatabaseAccountsRepository implements IAccountsRepository {
    resetState (): IDefaultaccountsRepositoryResponse {
        IN_MEMORY_ACCOUNTS_DATABASE.length = 0;
        IN_MEMORY_ACCOUNTS_DATABASE.push(new AccountEntity("300", 0));
        return { success: true, message: "OK" };
    }

    getAccountEntity (accountId: string): AccountEntity | null {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountId) {
                return IN_MEMORY_ACCOUNTS_DATABASE[i];
            }
        }
        return null;
    }

    getAccountsEntities (
        accountOriginId: string,
        accountDestinationId: string,
    ): IAccountsRepositoryGetAccountsEntitiesResponse {
        let indexOfAccountOrigin = null;
        let indexOfAccountDestination = null;

        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountOriginId) indexOfAccountOrigin = i;

            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountDestinationId)
                indexOfAccountDestination = i;

            if (indexOfAccountOrigin !== null && indexOfAccountDestination !== null) {
                return {
                    accountEntityOrigin: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin],
                    accountEntityDestination:
                        IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination],
                };
            }
        }

        return {
            accountEntityOrigin: null,
            accountEntityDestination: null,
        };
    }

    createNewAccount (accountId: string, amount: number): AccountEntity {
        const newAccountEntity = new AccountEntity(accountId, amount);
        IN_MEMORY_ACCOUNTS_DATABASE.push(newAccountEntity);
        return newAccountEntity;
    }
}
