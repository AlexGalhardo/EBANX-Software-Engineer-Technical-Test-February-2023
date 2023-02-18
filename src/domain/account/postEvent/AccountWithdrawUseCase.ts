import { IAccountsRepository } from "../../../ports/IAccountsRepository";

interface IAccountWithdrawUseCaseParams {
    origin: string;
    amount: number;
}

export default class AccountWithdrawUseCase {
    private readonly accountsRepository: IAccountsRepository;

    constructor(accountsRepository: IAccountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async execute ({ origin, amount }: IAccountWithdrawUseCaseParams) {
        const accountEntity = this.accountsRepository.getAccountEntity(origin);

        if (accountEntity?.withdrawBalance(amount)) {
            return {
                success: true,
                data: {
                    origin: {
                        id: accountEntity?.getId,
                        balance: accountEntity?.getBalance,
                    },
                }
            };
        }

        return {
            success: false,
            error: accountEntity ? `Not enough balance to withdraw ${amount}` : `Account Id: ${origin} not found`
        };
    }
}
