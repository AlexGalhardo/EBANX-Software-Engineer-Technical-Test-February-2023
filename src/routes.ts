import { Router } from "express";

import GetBalanceController from "./domain/account/getBalance/GetBalanceController";
import PostEventController from "./domain/account/postEvent/PostEventController";
import ResetStateController from "./domain/account/resetState/ResetStateController";

export default Router()
    .post("/reset", ResetStateController.handle)
    .post("/event", PostEventController.handle)
    .get("/balance", GetBalanceController.handle);
