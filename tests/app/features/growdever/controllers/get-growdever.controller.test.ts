import request from "supertest";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { createApp } from "../../../../../src/main/config/express.config";
import { CreateGrowdeverUsecase } from "../../../../../src/app/features/growdever/usecases/create-growdever.usecase";
import { GrowdeverRepository } from "../../../../../src/app/features/growdever/repositories/growdever.repository";
import { Growdever } from "../../../../../src/app/models/growdever.model";
import { GrowdeverEntity } from "../../../../../src/app/shared/database/entities/growdever.entity";

describe("Get growdever controller unit tests", () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
        await RedisConnection.connection.quit();
    });

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();

        await DatabaseConnection.connection
            .getRepository(GrowdeverEntity)
            .clear();
    });

    const app = createApp();

    const createGrowdever = async (growdever: Growdever) => {
        await DatabaseConnection.connection
            .getRepository(GrowdeverEntity)
            .create({
                id: growdever.id,
                cpf: growdever.cpf,
                idade: growdever.idade,
                nome: growdever.nome,
                nota: 10,
                indAtivo: true,
            })
            .save();
    };

    test("Deveria retornar erro 404 se o growdever não foi encontrado", async () => {
        const result = await request(app).get(`/growdever/123`).send();

        expect(result).toBeDefined();
        expect(result.statusCode).toBe(404);

        expect(result.body).toBeDefined();
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Growdever not found");
    });

    test("Deveria retornar 200 se o growdever foi encontrado", async () => {
        const growdever = new Growdever("Jose", 20, "POA", 123456, "12354");
        await createGrowdever(growdever);

        const result = await request(app)
            .get(`/growdever/${growdever.id}`)
            .send();

        expect(result).toBeDefined();
        expect(result.statusCode).toBe(200);

        expect(result.body).toBeDefined();
        expect(result.body).toHaveProperty("ok", true);
        expect(result.body).toHaveProperty(
            "message",
            "Growdever successfully obtained"
        );
    });

    test("Deveria retornar 500 se o repository gerou exceção", async () => {
        jest.spyOn(GrowdeverRepository.prototype, "get").mockImplementation(
            (_: string) => {
                throw new Error("Mock error");
            }
        );

        const result = await request(app).get(`/growdever/123`).send();

        expect(result).toBeDefined();
        expect(result.statusCode).toBe(500);

        expect(result.body).toBeDefined();
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Error: Mock error");
    });
});
