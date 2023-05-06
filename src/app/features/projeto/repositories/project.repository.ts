import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Project } from "../../../models/project.model";
import { ProjectEntity } from "../../../shared/database/entities/project.entity";
import { GrowdeverRepository } from "../../growdever/repositories/growdever.repository";
import { CreateProjectContract } from "../contracts/create-project.contract";
import { ListProjectsContract } from "../contracts/list-projects.contract";

export class ProjectRepository
    implements ListProjectsContract, CreateProjectContract
{
    private repository =
        DatabaseConnection.connection.getRepository(ProjectEntity);

    public async list(growdeverId: string): Promise<Project[]> {
        const result = await this.repository.findBy({
            growdeverId,
        });

        return result.map((item) => this.mapEntityToModel(item));
    }

    public async create(project: Project) {
        const projectEntity = this.repository.create({
            id: project.id,
            dtEntrega: project.dtEntrega,
            growdeverId: project.growdever.id,
            indAtivo: project.indAtivo,
            nome: project.nome,
        });

        await this.repository.save(projectEntity);
    }

    private mapEntityToModel(entity: ProjectEntity): Project {
        return Project.create(
            entity.id,
            entity.nome,
            entity.indAtivo,
            entity.dtEntrega,
            new GrowdeverRepository().mapEntityToModel(entity.growdever)
        );
    }
}
