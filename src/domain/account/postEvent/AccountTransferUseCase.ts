import { IAccountsRepository } from "../../../ports/IAccountsRepository";

interface IAccountTransferUseCaseParams {
    origin: string;
    amount: number;
    destination: string;
}

export default class AccountTransferUseCase {
    private readonly accountsRepository: IAccountsRepository;

    constructor(accountsRepository: IAccountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async execute ({ origin, amount, destination }: IAccountTransferUseCaseParams) {
        const { accountEntityOrigin, AccountEntityDestination } = this.accountsRepository.getAccountsEntities(origin, destination)

        if (accountEntityOrigin?.withdrawBalance(amount)) {

            AccountEntityDestination?.depositBalance(amount);

            return {
                success: true,
                data: {
                    origin: {
                        id: accountEntityOrigin?.getId,
                        balance: accountEntityOrigin?.getBalance,
                    },
                    destination: {
                        id: AccountEntityDestination?.getId,
                        balance: AccountEntityDestination?.getBalance,
                    },
                },
            };
        }

        return {
            success: false,
            data: 0,
        };
    }
}
