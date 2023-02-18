export class AccountEntity {
    constructor(private readonly id: string, private balance: number) {
        this.id = id;
        this.balance = balance;
    }

    get getId (): string {
        return this.id
    }

    get getBalance (): number {
        return this.balance
    }

    public depositBalance (amount: number): void {
        this.balance += amount
    }
};
