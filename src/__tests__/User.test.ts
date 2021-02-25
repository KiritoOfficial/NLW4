import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {

        const response = await request(app).post("/users").send({
            name: "KiritoOfficial>Test",
            email: "swordartonline@test.com",
        });

        expect(response.status).toBe(201);
    });

    it("Should not be to create a user with exists email", async () => {
        const response = await request(app).post("/users").send({
            name: "KiritoOfficial>Test",
            email: "swordartonline@test.com",
        });

        expect(response.status).toBe(400);
    });
});