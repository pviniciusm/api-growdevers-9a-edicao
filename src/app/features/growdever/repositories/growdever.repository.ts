import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { GrowdeverEntity } from "../../../shared/database/entities/growdever.entity";
import { Growdever } from "../../../models/growdever.model";
import { SkillRepository } from "../../skill/repositories/skill.repository";
import {
    CreateGrowdeverRepositoryContract,
    DeleteGrowdeverRepositoryContract,
    GetGrowdeverRepositoryContract,
} from "../util/growdever-repository.contract";
import { GetGrowdeverContract } from "../contracts/get-growdever.contract";
import { ProjectEntity } from "../../../shared/database/entities/project.entity";
import { Project } from "../../../models/project.model";

export class GrowdeverRepository
    implements
        CreateGrowdeverRepositoryContract,
        DeleteGrowdeverRepositoryContract,
        GetGrowdeverRepositoryContract,
        GetGrowdeverContract
{
    private repository =
        DatabaseConnection.connection.getRepository(GrowdeverEntity);

    public async list(idade?: number): Promise<Growdever[]> {
        const result = await GrowdeverEntity.find({
            where: {
                idade,
            },
            relations: ["endereco"],
        });

        console.log(result);

        return result.map((growdever: any) => this.mapEntityToModel(growdever));
    }

    public mapEntityToModel(entity: GrowdeverEntity): Growdever {
        const skillsEntity = entity.skills ?? [];

        const skills = skillsEntity.map((item) =>
            SkillRepository.mapEntityToModel(item)
        );

        let cidade = "";

        if (entity.endereco != null) {
            cidade = entity.endereco.cidade;
        }

        const growdever = Growdever.create(
            entity.id.trim(),
            entity.nome,
            entity.idade,
            cidade,
            entity.cpf,
            "indefinido",
            skills
        );

        return growdever;
    }

    private mapProjectEntityToModel(
        entity: ProjectEntity,
        growdever: Growdever
    ): Project {
        return Project.create(
            entity.id,
            entity.nome,
            entity.indAtivo,
            entity.dtEntrega,
            growdever
        );
    }

    public async get(id: string) {
        const result = await this.repository.findOne({
            where: {
                id,
            },
        });

        if (result === null) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    public async getByCpf(cpf: number) {
        const result = await this.repository.findOne({
            where: {
                cpf,
            },
        });

        if (result === null) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    public async create(growdever: Growdever) {
        const growdeverEntity = GrowdeverEntity.create({
            cpf: growdever.cpf,
            id: growdever.id,
            idade: growdever.idade,
            indAtivo: true,
            nome: growdever.nome,
            nota: 10,
        });

        const result = await this.repository.save(growdeverEntity);

        return this.mapEntityToModel(result);
    }

    public async createWithId(growdever: Growdever) {
        let query = `insert into growdevers.growdever `;
        query += `(id, nome, cpf, idade, nota, ind_ativo, dt_nascimento) `;
        query += `values `;
        query += `('${growdever.id}', '${growdever.nome}', ${growdever.cpf}, ${growdever.idade}, 8, true, '1980-11-20') `;

        await DatabaseConnection.connection.query(query);
    }

    public async delete(id: string): Promise<number> {
        const result = await this.repository.delete({
            id,
        });

        return result.affected ?? 0;
    }

    public async deleteWithRemove(id: string): Promise<number> {
        const growdeverEntity = await this.repository.findOneBy({
            id,
        });

        if (!growdeverEntity) {
            return 0;
        }

        await growdeverEntity.remove();

        return 1;
    }

    public async update(id: string, idade: number): Promise<number> {
        const result = await this.repository.update(
            {
                id,
            },
            {
                idade,
                dthrAtualizacao: new Date(),
            }
        );

        return result.affected ?? 0;
    }

    public async updateWithSave(id: string, idade: number): Promise<number> {
        const growdeverEntity = await this.repository.findOneBy({
            id,
        });

        if (!growdeverEntity) {
            return 0;
        }

        growdeverEntity.idade = idade;
        await this.repository.save(growdeverEntity);

        return 1;
    }
}
