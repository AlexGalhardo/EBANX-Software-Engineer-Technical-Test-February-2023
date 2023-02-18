import { AccountEntity } from "../entities/AccountEntity"

interface IAccountDefault {
    id: string
    balance: number
}

export interface IDepositDataResponse {
    destination: IAccountDefault
}

export interface IWithdrawDataResponse {
    origin: IAccountDefault
}

export interface ITransferDataResponse {
    origin: IAccountDefault
    destination: IAccountDefault
}

export interface IDefaultaccountsRepositoryResponse {
    success: boolean
    message?: string;
    error?: string;
}

export interface IAccountsRepositoryGetBalanceResponse extends IDefaultaccountsRepositoryResponse {
    data: IAccountDefault | 0
};

export interface IAccountsRepositoryDepositResponse extends IDefaultaccountsRepositoryResponse {
    data: IDepositDataResponse
};

export interface IAccountsRepositoryWithdrawResponse extends IDefaultaccountsRepositoryResponse {
    data?: IWithdrawDataResponse
};

export interface IAccountsRepositoryTransferResponse extends IDefaultaccountsRepositoryResponse {
    data: ITransferDataResponse | 0
};

export interface IAccountsRepositoryGetAccountsEntitiesResponse {
    accountEntityOrigin: AccountEntity | null,
    accountEntityDestination: AccountEntity | null
}

export interface IAccountsRepository {
    resetState (): IDefaultaccountsRepositoryResponse;
    getAccountEntity (accountId: string): AccountEntity | null;
    getAccountsEntities (accountOriginId: string, accountDestinationId: string): IAccountsRepositoryGetAccountsEntitiesResponse;
    createNewAccount (accountid: string, amount: number): AccountEntity;
    getBalance (accountId: string): IAccountsRepositoryGetBalanceResponse;
    deposit (destination: string, amount: number): IAccountsRepositoryDepositResponse;
    withdraw (destination: string, amount: number): IAccountsRepositoryWithdrawResponse;
    transfer (origin: string, amount: number, destination: string): IAccountsRepositoryTransferResponse;
}
