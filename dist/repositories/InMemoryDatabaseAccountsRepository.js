"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountEntity_1 = require("../entities/AccountEntity");
const IN_MEMORY_ACCOUNTS_DATABASE = [];
class InMemoryDatabaseAccountsRepository {
    resetState() {
        IN_MEMORY_ACCOUNTS_DATABASE.length = 0;
        IN_MEMORY_ACCOUNTS_DATABASE.push(new AccountEntity_1.AccountEntity("300", 0));
        return { success: true, message: "OK" };
    }
    getAccountEntity(accountId) {
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountId) {
                return IN_MEMORY_ACCOUNTS_DATABASE[i];
            }
        }
        return null;
    }
    getAccountsEntities(accountOriginId, accountDestinationId) {
        let indexOfAccountOrigin = null;
        let indexOfAccountDestination = null;
        for (let i = 0; i < IN_MEMORY_ACCOUNTS_DATABASE.length; i++) {
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountOriginId)
                indexOfAccountOrigin = i;
            if (IN_MEMORY_ACCOUNTS_DATABASE[i].getId === accountDestinationId)
                indexOfAccountDestination = i;
            if (indexOfAccountOrigin !== null && indexOfAccountDestination !== null) {
                return {
                    accountEntityOrigin: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountOrigin],
                    accountEntityDestination: IN_MEMORY_ACCOUNTS_DATABASE[indexOfAccountDestination],
                };
            }
        }
        return {
            accountEntityOrigin: null,
            accountEntityDestination: null,
        };
    }
    createNewAccount(accountId, amount) {
        const newAccountEntity = new AccountEntity_1.AccountEntity(accountId, amount);
        IN_MEMORY_ACCOUNTS_DATABASE.push(newAccountEntity);
        return newAccountEntity;
    }
}
exports.default = InMemoryDatabaseAccountsRepository;
