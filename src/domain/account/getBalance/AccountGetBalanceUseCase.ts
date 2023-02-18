import { IAccountsRepository } from "../../../ports/IAccountsRepository";

export default class AccountGetBalanceUseCase {
    private readonly accountsRepository: IAccountsRepository;

    constructor(accountsRepository: IAccountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async execute(accountId: string) {
        const accountEntity = this.accountsRepository.getAccountEntity(accountId);

        if (accountEntity) {
            return {
                success: true,
                data: accountEntity.getBalance,
            };
        }

        return {
            success: false,
            error: `Account Id: ${accountId} not found`,
            data: 0,
        };
    }
}
