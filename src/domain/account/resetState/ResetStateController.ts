import { Request, Response } from "express";

import { makeAccountsRepository } from "../../../factories/makeAccountsRepository";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import AccountResetStateUseCase from "./AccountResetStateUseCase";

export default class ResetStateController {
    static async handle(_: Request, res: Response) {
        const { success, message } = new AccountResetStateUseCase(
            makeAccountsRepository(),
        ).execute();

        return res.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST).send(message);
    }
}
