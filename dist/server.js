"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
app_1.default.listen(process.env.PORT || 3333, () => console.log(`ALEX GALHARDO EBANX API server is running at ${process.env.PORT ?? 3333}`));
