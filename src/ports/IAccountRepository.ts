import {
    HttpStatusCode,
} from "../utils/HttpStatusCode";

export type typeDepositMessage = {
    destination: {
        id: string;
        balance: number;
    };
};

export type typeWithdrawMessage = {
    origin: {
        id: string;
        balance: number;
    };
};

export type typeTransferMessage = {
    origin: {
        id: string;
        balance: number;
    };
    destination: {
        id: string;
        balance: number;
    };
};

export interface IDefaultAccountRepositoryResponse {
    success: boolean
    message?: string;
    error?: string;
}

export interface IAccountRepositoryGetBalanceResponse extends IDefaultAccountRepositoryResponse {
    data?: {
        account_id: string
        balance: number
    }
};

export interface IAccountRepositoryDepositResponse extends IDefaultAccountRepositoryResponse {
    data?: {
        destination: {
            id: string,
            balance: number,
        },
    }
};

export interface IAccountRepositoryWithdrawResponse extends IDefaultAccountRepositoryResponse {
    data?: {
        origin: {
            id: string,
            balance: number,
        },
    }
};

export type typeTransferMethodResponse = {
    httpStatusCode: HttpStatusCode.CREATED | HttpStatusCode.NOT_FOUND;
    message: 0 | typeTransferMessage;
};

export interface IAccountRepository {
    resetState (): IDefaultAccountRepositoryResponse;
    getBalance (accountId: string): IAccountRepositoryGetBalanceResponse;
    deposit (destination: string, amount: number): IAccountRepositoryDepositResponse;
    withdraw (destination: string, amount: number): IAccountRepositoryWithdrawResponse;
    transfer (origin: string, amount: number, destination: string): typeTransferMethodResponse;
}
