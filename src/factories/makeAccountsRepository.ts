import { IAccountsRepository } from "../ports/IAccountsRepository";
import InMemoryDatabaseAccountsRepository from "../repositories/InMemoryDatabaseAccountsRepository";

export const makeAccountsRepository = (): IAccountsRepository => {
    return new InMemoryDatabaseAccountsRepository();

    // Se for necessário mudar para um repository Postgres por exemplo
    // return new PostgresAccountsRepository();

    // Se for necessário mudar para um repository MongoDB por exemplo
    // return new MongoDBAccountsRepository();
};
