import { DeleteGrowdeverUsecase } from "./../../../../../src/app/features/growdever/usecases/delete-growdever.usecase";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { GrowdeverRepository } from "../../../../../src/app/features/growdever/repositories/growdever.repository";

describe("Delete growdever usecase tests", () => {
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
        return new DeleteGrowdeverUsecase(new GrowdeverRepository());
    };

    // 1- deveria retornar ok false e code 404 se não existe um growdever com id
    test("deveria retornar ok false e code 404 se não existe um growdever com id", async () => {
        jest.spyOn(GrowdeverRepository.prototype, "delete").mockResolvedValue(
            0
        );

        const sut = makeSut();

        const result = await sut.execute("any_id");

        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 404);
        expect(result).toHaveProperty("message", "Growdever not found");
    });

    // 2- deveria retornar sucesso (200) se o growdever existir
    test("deveria retornar sucesso (200) se o growdever existir e for deletado", async () => {
        jest.spyOn(GrowdeverRepository.prototype, "delete").mockResolvedValue(
            1
        );

        const sut = makeSut();

        const result = await sut.execute("any_id");

        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", true);
        expect(result).toHaveProperty("code", 200);
        expect(result).toHaveProperty(
            "message",
            "Growdever was successfully deleted"
        );
        expect(result).toHaveProperty("data", "any_id");
    });
});
