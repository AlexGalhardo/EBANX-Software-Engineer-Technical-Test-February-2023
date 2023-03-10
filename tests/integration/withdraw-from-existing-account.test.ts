import request from "supertest";

import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/HttpStatusCode";

describe("testing withdraw from existing account", () => {
    it("it should return http status code 201 with correct json response", async () => {
        await request(app)
            .post("/event")
            .send({
                type: "deposit",
                destination: "100",
                amount: 20,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        const response = await request(app)
            .post("/event")
            .send({
                type: "withdraw",
                origin: "100",
                amount: 5,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        const responseBodyToBe = {
            origin: {
                id: "100",
                balance: 15,
            },
        };

        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(JSON.stringify(response.body)).toEqual(JSON.stringify(responseBodyToBe));
    });
});
