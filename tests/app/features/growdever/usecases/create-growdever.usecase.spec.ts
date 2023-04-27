import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { GrowdeverRepository } from "./../../../../../src/app/features/growdever/repositories/growdever.repository";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { CreateGrowdeverUsecase } from "./../../../../../src/app/features/growdever/usecases/create-growdever.usecase";
import { Growdever } from "../../../../../src/app/models/growdever.model";
import { CreateGrowdeverRepositoryContract } from "../../../../../src/app/features/growdever/util/growdever-repository.contract";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { createGrowdeverUsecaseFactory } from "../../../../../src/app/features/growdever/util/growdever-usecase.factory";

class MockGrowdeverRepository implements CreateGrowdeverRepositoryContract {
    public async create(growdever: Growdever): Promise<Growdever> {
        return new Growdever(
            growdever.nome,
            growdever.idade,
            "abc",
            growdever.cpf,
            growdever.password
        );
    }
}

describe("Create growdever usecase unit tests", () => {
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

    const makeSut = () => {
        return createGrowdeverUsecaseFactory();
    };

    const growdever = {
        nome: "Teste Jose",
        cidade: "Teste",
        cpf: 12345,
        password: "abc",
        idade: 30,
    };

    test("deveria retornar erro 400 se a idade for menor que 18 anos", async () => {
        const sut = makeSut();

        const result = await sut.execute({
            ...growdever,
            idade: 17,
        });

        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 400);
        expect(result).toHaveProperty("message", "Idade is invalid");
    });

    test("deveria retornar erro 400 se a idade for maior que 99 anos", async () => {
        const sut = makeSut();

        const result = await sut.execute({
            ...growdever,
            idade: 100,
        });

        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 400);
        expect(result).toHaveProperty("message", "Idade is invalid");
    });

    test("deveria retornar erro 400 se o nome possuir menos do que 6 caracteres", async () => {
        const sut = makeSut();

        const result = await sut.execute({
            ...growdever,
            nome: "abc",
        });

        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 400);
        expect(result).toHaveProperty(
            "message",
            "Nome must be greater than 6 characters"
        );
    });

    test("deveria retornar sucesso (201) se o growdever for criado com sucesso", async () => {
        // jest.spyOn(GrowdeverRepository.prototype, "create").mockResolvedValue(
        //     new Growdever(
        //         growdever.nome,
        //         growdever.idade,
        //         growdever.cidade,
        //         growdever.cpf,
        //         growdever.password
        //     )
        // );

        // const sut = makeSut();
        const database = new MockGrowdeverRepository();
        const cache = new CacheRepository();

        const sut = new CreateGrowdeverUsecase(database, cache);

        const result = await sut.execute({
            ...growdever,
        });

        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", true);
        expect(result).toHaveProperty("code", 201);
        expect(result).toHaveProperty(
            "message",
            "Growdever was successfully created"
        );

        expect(result).toHaveProperty("data");

        expect(result).toHaveProperty("data.cpf");
        let cpf = cpfValidator.format(
            result.data.cpf.toString().padStart(11, "0")
        );
        expect(result.data.cpf).toEqual(cpf);

        expect(result).toHaveProperty("data.nome", growdever.nome);
        expect(result).toHaveProperty("data.idade", growdever.idade);
        expect(result).toHaveProperty("data.cidade", growdever.cidade);
        expect(result).toHaveProperty("data.id");
        expect(result.data.id).toBeDefined();
        expect(result.data.id).toHaveLength(36);
    });
});
