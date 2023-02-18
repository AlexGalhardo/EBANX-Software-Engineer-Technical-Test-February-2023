export class AccountEntity {
    constructor(private readonly id: string, private balance: number, private queueWithdraws: number[] = [], private queueDeposits: number[] = []) {
        this.id = id;
        this.balance = balance;
    }

    get getId (): string {
        return this.id
    }

    get getBalance (): number {
        return this.balance
    }

    public depositBalance (amount: number): boolean {
        if (amount <= 0) return false

        this.queueDeposits.push(amount)

        for (let i = 0; i < this.queueDeposits.length; i++) {
            this.balance += this.queueDeposits[i]
            this.queueDeposits.shift()
        }

        return true
    }

    public withdrawBalance (amount: number): boolean {
        // adiciono o saque em uma fila 'FIFO' de saques
        this.queueWithdraws.push(amount)

        // verifico a sequencia de saques em ordem de chegada
        // se account balance continua tendo saldo, vou retirando os saques do balance em sequencia
        for (let i = 0; i < this.queueWithdraws.length; i++) {
            if (this.balance >= this.queueWithdraws[i]) {
                this.balance -= this.queueWithdraws[i]
                this.queueWithdraws.shift()
            }

            // se existir saques para serem feitos ainda
            // e saque for maior que o account balance, não é possível continuar a operação
            // zero a fila de saques
            if (this.queueWithdraws.length && this.balance < this.queueWithdraws[i]) {
                this.queueWithdraws = []
                return false
            }
        }

        return true
    }
};
