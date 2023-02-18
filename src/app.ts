import express, { Request, Response } from "express";

import "express-async-errors";
import routes from "./routes";
import {
    HttpStatusCode,
} from "./utils/HttpStatusCode";

const app = express();

app.use(express.json())
    .use(routes)
    .use((error: Error, request: Request, response: Response) => {
        if (error instanceof Error) {
            return response.status(HttpStatusCode.BAD_REQUEST).json({
                message: error.message,
            });
        }
        return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Internal Server Error",
        });
    });

export default app;
