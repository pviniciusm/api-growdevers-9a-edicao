import { Project } from "../../../models/project.model";
import { GetGrowdeverContract } from "../../growdever/contracts/get-growdever.contract";
import { CreateProjectContract } from "../contracts/create-project.contract";
import { ListProjectsContract } from "../contracts/list-projects.contract";

interface CreateProjectParams {
    dataEntrega: Date;
    idGrowdever: string;
    nome: string;
}

export class CreateProjectUsecase {
    constructor(
        private getGrowdeverRepository: GetGrowdeverContract,
        private listProjectsRepository: ListProjectsContract,
        private createProjectRepository: CreateProjectContract
    ) {}

    public async execute(params: CreateProjectParams) {
        if (params.dataEntrega <= new Date()) {
            return {
                ok: false,
                code: 400,
                message: "A data de entrega deve ser maior que a data atual",
            };
        }

        const growdever = await this.getGrowdeverRepository.get(
            params.idGrowdever
        );
        if (!growdever) {
            return {
                ok: false,
                code: 404,
                message: "Growdever não existe",
            };
        }

        const projects = await this.listProjectsRepository.list(
            params.idGrowdever
        );
        if (projects.length >= 2) {
            return {
                ok: false,
                code: 400,
                message: "Numero maximo de projetos já foi atingido",
            };
        }

        const project = new Project(params.nome, params.dataEntrega, growdever);

        await this.createProjectRepository.create(project);

        return {
            ok: true,
            code: 201,
            message: "Projeto criado com sucesso",
        };
    }
}
