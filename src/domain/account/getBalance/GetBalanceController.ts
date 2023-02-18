import { Request, Response } from "express";

import { makeAccountsRepository } from "../../../factories/makeAccountsRepository";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import AccountGetBalanceUseCase from "./AccountGetBalanceUseCase";

export default class GetBalanceController {
    static async handle (req: Request, res: Response) {
        const { account_id } = req.query as { account_id: string };

        const { success, data } = await new AccountGetBalanceUseCase(
            makeAccountsRepository(),
        ).execute(account_id);

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND)
            .json(data);
    }
}
