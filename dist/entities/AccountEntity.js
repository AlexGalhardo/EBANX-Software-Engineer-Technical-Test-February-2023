"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountEntity = void 0;
class AccountEntity {
    constructor(id, balance, queueWithdraws = [], queueDeposits = []) {
        this.id = id;
        this.balance = balance;
        this.queueWithdraws = queueWithdraws;
        this.queueDeposits = queueDeposits;
        this.id = id;
        this.balance = balance;
    }
    get getId() {
        return this.id;
    }
    get getBalance() {
        return this.balance;
    }
    depositBalance(amount) {
        if (amount <= 0)
            return false;
        this.queueDeposits.push(amount);
        for (let i = 0; i < this.queueDeposits.length; i++) {
            this.balance += this.queueDeposits[i];
            this.queueDeposits.shift();
        }
        return true;
    }
    withdrawBalance(amount) {
        this.queueWithdraws.push(amount);
        for (let i = 0; i < this.queueWithdraws.length; i++) {
            if (this.balance >= this.queueWithdraws[i]) {
                this.balance -= this.queueWithdraws[i];
                this.queueWithdraws.shift();
            }
            if (this.queueWithdraws.length && this.balance < this.queueWithdraws[i]) {
                this.queueWithdraws = [];
                return false;
            }
        }
        return true;
    }
}
exports.AccountEntity = AccountEntity;
