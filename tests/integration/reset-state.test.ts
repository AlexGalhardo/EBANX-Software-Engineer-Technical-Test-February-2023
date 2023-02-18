import request from "supertest";

import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/HttpStatusCode";

describe("testing reset state", () => {
    it("it should return http status code HTTP_STATUS_CODE_OK with text OK message", async () => {
        const response = await request(app).post("/reset");
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
    });
});
