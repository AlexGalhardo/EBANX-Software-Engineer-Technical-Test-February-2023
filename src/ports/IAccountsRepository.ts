import { AccountEntity } from "../entities/AccountEntity";

interface IAccountDefault {
    id: string;
    balance: number;
}

export interface IDepositDataResponse {
    destination: IAccountDefault;
}

export interface IWithdrawDataResponse {
    origin: IAccountDefault;
}

export interface ITransferDataResponse {
    origin: IAccountDefault;
    destination: IAccountDefault;
}

export interface IDefaultaccountsRepositoryResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export interface IAccountsRepositoryGetAccountsEntitiesResponse {
    accountEntityOrigin: AccountEntity | null;
    accountEntityDestination: AccountEntity | null;
}

export interface IAccountsRepository {
    resetState (): IDefaultaccountsRepositoryResponse;
    getAccountEntity (accountId: string): AccountEntity | null;
    getAccountsEntities (
        accountOriginId: string,
        accountDestinationId: string,
    ): IAccountsRepositoryGetAccountsEntitiesResponse;
    createNewAccount (accountid: string, amount: number): AccountEntity;
}
