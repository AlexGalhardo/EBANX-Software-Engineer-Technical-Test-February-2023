"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountResetStateUseCase {
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    execute() {
        const { success, message } = this.accountsRepository.resetState();
        return { success, message };
    }
}
exports.default = AccountResetStateUseCase;
