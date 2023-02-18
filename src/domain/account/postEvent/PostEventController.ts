import { Request, Response } from "express";

import { makeAccountsRepository } from "../../../factories/makeAccountsRepository";
import {
    IDepositDataResponse,
    IWithdrawDataResponse,
    ITransferDataResponse,
} from "../../../ports/IAccountsRepository";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import AccountDepositUseCase from "./AccountDepositUseCase";
import AccountTransferUseCase from "./AccountTransferUseCase";
import AccountWithdrawUseCase from "./AccountWithdrawUseCase";

export default class PostEventController {
    static async handle (req: Request, res: Response) {
        const { type, origin, amount, destination } = req.body;

        let postEventResponse: {
            success: boolean;
            data?: 0 | IDepositDataResponse | IWithdrawDataResponse | ITransferDataResponse;
        };

        if (type === "deposit") {
            postEventResponse = await new AccountDepositUseCase(makeAccountsRepository()).execute({
                destination,
                amount,
            });
        } else if (type === "withdraw") {
            postEventResponse = await new AccountWithdrawUseCase(makeAccountsRepository()).execute({
                origin,
                amount,
            });
        } else if (type === "transfer") {
            postEventResponse = await new AccountTransferUseCase(makeAccountsRepository()).execute({
                origin,
                amount,
                destination,
            });
        }

        return res
            .status(postEventResponse!.success ? HttpStatusCode.CREATED : HttpStatusCode.NOT_FOUND)
            .json(postEventResponse!.data);
    }
}
