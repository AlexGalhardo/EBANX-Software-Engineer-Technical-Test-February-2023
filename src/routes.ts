import { Router, Request, Response } from "express";

import GetBalanceController from "./domain/account/getBalance/GetBalanceController";
import PostEventController from "./domain/account/postEvent/PostEventController";
import ResetStateController from "./domain/account/resetState/ResetStateController";

export default Router()
    .get("/", (_: Request, res: Response) => {
        return res.json({
            success: true,
            message: {
                resume: "Alex Galhardo EBANX Software Engineer Technical Test February 2023",
                email: "aleexgvieira@gmail.com",
                github: "https://github.com/AlexGalhardo",
                linkedin: "https://linkedin.com/in/alexgalhardo",
                sourceCode: "https://github.com/AlexGalhardo/EBANX-Software-Engineer-Technical-Test-February-2023",
            }
        })
    })
    .post("/reset", ResetStateController.handle)
    .post("/event", PostEventController.handle)
    .get("/balance", GetBalanceController.handle);
