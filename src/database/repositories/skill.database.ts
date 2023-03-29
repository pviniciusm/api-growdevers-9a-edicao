import { Skill } from "../../models/skill.model";
import { DatabaseConnection } from "../config/database.connection";
import { SkillEntity } from "../entities/skill.entity";

export class SkillDatabase {
    private repository =
        DatabaseConnection.connection.getRepository(SkillEntity);

    public async list() {
        const result = await this.repository.find({
            relations: ["categorias"],
        });

        // return result.map((item) => SkillDatabase.mapEntityToModel(item));
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

        return SkillDatabase.mapEntityToModel(result);
    }

    public static mapEntityToModel(entity: SkillEntity): Skill {
        return Skill.create(entity.id, entity.nome, entity.arquivada);
    }
}
