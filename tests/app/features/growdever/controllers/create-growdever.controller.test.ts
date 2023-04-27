import request from "supertest";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { createApp } from "../../../../../src/main/config/express.config";
import { CreateGrowdeverUsecase } from "../../../../../src/app/features/growdever/usecases/create-growdever.usecase";
import { GrowdeverRepository } from "../../../../../src/app/features/growdever/repositories/growdever.repository";
import { Growdever } from "../../../../../src/app/models/growdever.model";

describe("Create growdever controller unit tests", () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
        await RedisConnection.connection.quit();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    const app = createApp();

    const checkFieldNotProvided = (res: any, field: string) => {
        expect(res).toBeDefined();
        expect(res).toHaveProperty("statusCode", 400);
        expect(res).toHaveProperty("body.message", `${field} was not provided`);
    };

    test("deveria retornar status 400 se o nome não for informado", async () => {
        const res = await request(app).post("/growdever").send({});
        checkFieldNotProvided(res, "Nome");
    });

    test("deveria retornar status 400 se a idade não for informada", async () => {
        const res = await request(app).post("/growdever").send({
            nome: "any_name",
        });

        checkFieldNotProvided(res, "Idade");
    });

    test("deveria retornar status 400 se a cidade não for informada", async () => {
        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
        });

        checkFieldNotProvided(res, "Cidade");
    });

    test("deveria retornar status 400 se o password não for informado", async () => {
        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
        });

        checkFieldNotProvided(res, "Password");
    });

    test("deveria retornar status 400 se o cpf não for informado", async () => {
        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
        });

        checkFieldNotProvided(res, "CPF");
    });

    test("deveria retornar status 400 se o cpf for inválido", async () => {
        jest.spyOn(cpfValidator, "isValid").mockReturnValue(false);

        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
            cpf: "05160901000",
        });

        expect(res).toBeDefined();
        expect(res).toHaveProperty("statusCode", 400);
        expect(res).toHaveProperty("body.message", "CPF is invalid");
    });

    test("deveria retornar status 500 se a validação de CPF gerar exception", async () => {
        jest.spyOn(cpfValidator, "isValid").mockImplementation(
            (number: string) => {
                throw new Error("Erro simulado");
            }
        );

        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
            cpf: "05160901000",
        });

        expect(res).toBeDefined();
        expect(res).toHaveProperty("statusCode", 500);
    });

    test("deveria retornar status 400 se o CPF já existir", async () => {
        jest.spyOn(cpfValidator, "isValid").mockReturnValue(true);

        jest.spyOn(GrowdeverRepository.prototype, "getByCpf").mockResolvedValue(
            new Growdever("any_name", 20, "any_city", 12345, "any_password")
        );

        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
            cpf: "05160901000",
        });

        expect(res).toBeDefined();
        expect(res).toHaveProperty("statusCode", 400);
        expect(res).toHaveProperty("body.message", "Growdever already exists");
    });

    test("deveria retornar status 500 se o getByCpf gerar exception", async () => {
        jest.spyOn(cpfValidator, "isValid").mockReturnValue(true);

        jest.spyOn(
            GrowdeverRepository.prototype,
            "getByCpf"
        ).mockImplementation((_: number) => {
            throw new Error("Erro simulado");
        });

        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
            cpf: "05160901000",
        });

        expect(res).toBeDefined();
        expect(res).toHaveProperty("statusCode", 500);
        expect(res).toHaveProperty("body.message", "Error: Erro simulado");
    });

    test("deveria retornar status 201 quando o usecase executar com sucesso", async () => {
        jest.spyOn(cpfValidator, "isValid").mockReturnValue(true);
        jest.spyOn(GrowdeverRepository.prototype, "getByCpf").mockResolvedValue(
            null
        );

        jest.spyOn(
            CreateGrowdeverUsecase.prototype,
            "execute"
        ).mockResolvedValue({
            ok: true,
            code: 201,
            message: "Teste",
            data: {},
        });

        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
            cpf: "05160901000",
        });

        expect(res).toBeDefined();
        expect(res.statusCode).toBe(201);
    });

    test("deveria retornar status 500 quando o usecase gerar exception", async () => {
        jest.spyOn(cpfValidator, "isValid").mockReturnValue(true);
        jest.spyOn(GrowdeverRepository.prototype, "getByCpf").mockResolvedValue(
            null
        );

        jest.spyOn(
            CreateGrowdeverUsecase.prototype,
            "execute"
        ).mockImplementation((_: any) => {
            throw new Error("Erro simulado usecase");
        });

        const res = await request(app).post("/growdever").send({
            nome: "any_name",
            idade: 20,
            cidade: "any_city",
            password: "any_password",
            cpf: "05160901000",
        });

        expect(res).toBeDefined();
        expect(res.statusCode).toBe(500);
        expect(res).toHaveProperty(
            "body.message",
            "Error: Erro simulado usecase"
        );
    });
});
