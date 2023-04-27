import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Skill } from "../../../models/skill.model";
import { SkillEntity } from "../../../shared/database/entities/skill.entity";
import { SkillRepositoryContract } from "../util/skill-repository.contract";

export class SkillRepository implements SkillRepositoryContract {
    private repository =
        DatabaseConnection.connection.getRepository(SkillEntity);

    public async list() {
        const result = await this.repository.find({
            relations: ["categorias"],
        });

        return result;
    }

    public async create(id: string, skill: Skill) {
        const skillEntity = this.repository.create({
            id: skill.id,
            arquivada: skill.arquivada,
            nome: skill.nome,
            idGrowdever: id,
        });

        const result = await this.repository.save(skillEntity);
        console.log(result);

        return SkillRepository.mapEntityToModel(result);
    }

    public static mapEntityToModel(entity: SkillEntity): Skill {
        return Skill.create(entity.id, entity.nome, entity.arquivada);
    }
}
