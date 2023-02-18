import { IAccountsRepository } from "../../../ports/IAccountsRepository";

interface IAccountResetStateUseCaseResponse {
    success: boolean;
    message: string | undefined;
}
export default class AccountResetStateUseCase {
    private readonly accountsRepository: IAccountsRepository;

    constructor(accountsRepository: IAccountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    execute(): IAccountResetStateUseCaseResponse {
        const { success, message } = this.accountsRepository.resetState();
        return { success, message };
    }
}
