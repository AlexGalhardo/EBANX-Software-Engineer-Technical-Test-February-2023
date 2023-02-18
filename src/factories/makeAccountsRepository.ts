import { IAccountsRepository } from "../ports/IAccountsRepository";
import InMemoryDatabaseAccountsRepository from "../repositories/InMemoryDatabaseAccountsRepository";

export const makeAccountsRepository = (): IAccountsRepository => {
    return new InMemoryDatabaseAccountsRepository();

    // se eu fosse mudar para usar um banco postgres de repository, por exemplo
    // return new PostgresAccountsRepository();

    // se eu fosse mudar para usar um banco mongodb de repository, por exemplo
    // return new MongoDBAccountsRepository();
};
