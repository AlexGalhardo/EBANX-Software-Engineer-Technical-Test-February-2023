import { IAccountsRepository } from "../../../ports/IAccountsRepository";

interface IAccountDepositUseCaseParams {
    destination: string;
    amount: number;
}

export default class AccountDepositUseCase {
    private readonly accountsRepository: IAccountsRepository;

    constructor(accountsRepository: IAccountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async execute ({ destination, amount }: IAccountDepositUseCaseParams) {
        const accountEntity = this.accountsRepository.getAccountEntity(destination);

        if (accountEntity) {
            accountEntity.depositBalance(amount);
            return {
                success: true,
                data: {
                    destination: {
                        id: destination,
                        balance: accountEntity.getBalance,
                    },
                }
            };
        }
        else {
            this.accountsRepository.createNewAccount(destination, amount)

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
    }
}
