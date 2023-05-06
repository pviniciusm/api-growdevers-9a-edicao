import { Growdever } from "../../../../../src/app/models/growdever.model";
import { Project } from "../../../../../src/app/models/project.model";
import { GetGrowdeverContract } from "../../../../../src/app/features/growdever/contracts/get-growdever.contract";
import { CreateProjectContract } from "../../../../../src/app/features/projeto/contracts/create-project.contract";
import { ListProjectsContract } from "../../../../../src/app/features/projeto/contracts/list-projects.contract";
import { CreateProjectUsecase } from "../../../../../src/app/features/projeto/usecases/create-project.usecase";

class MockGetGrowdeverRepository implements GetGrowdeverContract {
    public async get(id: string): Promise<Growdever | null> {
        if (id === "1") {
            return null;
        }

        return new Growdever("joao", 20, "Porto Alegre", 12345, "1235");
    }
}

class MockListProjectsRepository implements ListProjectsContract {
    public async list(idGrowdever: string) {
        if (idGrowdever === "2") {
            return [
                new Project(
                    "abc",
                    new Date(),
                    new Growdever("joao", 20, "Porto Alegre", 12345, "1235")
                ),
                new Project(
                    "abc",
                    new Date(),
                    new Growdever("joao", 20, "Porto Alegre", 12345, "1235")
                ),
            ];
        }

        return [];
    }
}

class MockCreateProjectRepository implements CreateProjectContract {
    public async create(project: Project): Promise<void> {
        return;
    }
}

describe("Create project usecase tests", () => {
    const makeSut = () => {
        const mockGetRepository = new MockGetGrowdeverRepository();
        const mockListProjectsRepository = new MockListProjectsRepository();
        const mockCreateProjectRepository = new MockCreateProjectRepository();

        return new CreateProjectUsecase(
            mockGetRepository,
            mockListProjectsRepository,
            mockCreateProjectRepository
        );
    };

    const dataAtualMais5 = () => {
        let date = new Date();
        date.setDate(date.getDate() + 5);

        return date;
    };

    test("deveria retornar 400 se a data de entrega foi menor ou igual que a data atual", async () => {
        // 1 - criar o sut
        const sut = makeSut();

        // 2 - executar o metodo a ser testado
        const result = await sut.execute({
            dataEntrega: new Date(),
            idGrowdever: "any_id",
            nome: "any_name",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 400);
        expect(result).toHaveProperty(
            "message",
            "A data de entrega deve ser maior que a data atual"
        );
    });

    test("deveria retornar 404 se o growdever não existir", async () => {
        // 1 - criar o sut
        const sut = makeSut();

        // 2 - executar o metodo a ser testado
        const result = await sut.execute({
            dataEntrega: dataAtualMais5(),
            idGrowdever: "1",
            nome: "any_name",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 404);
        expect(result).toHaveProperty("message", "Growdever não existe");
    });

    test("deveria retornar 400 se o growdever possuir 2 projetos ou mais", async () => {
        // 1 - criar o sut
        const sut = makeSut();

        // 2 - executar o metodo a ser testado
        const result = await sut.execute({
            dataEntrega: dataAtualMais5(),
            idGrowdever: "2",
            nome: "any_name",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("code", 400);
        expect(result).toHaveProperty(
            "message",
            "Numero maximo de projetos já foi atingido"
        );
    });

    test("deveria retornar 201 se o projeto foi criado com sucesso", async () => {
        // 1 - criar o sut
        const sut = makeSut();

        // 2 - executar o metodo a ser testado
        const result = await sut.execute({
            dataEntrega: dataAtualMais5(),
            idGrowdever: "3",
            nome: "any_name",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", true);
        expect(result).toHaveProperty("code", 201);
        expect(result).toHaveProperty("message", "Projeto criado com sucesso");
    });
});
