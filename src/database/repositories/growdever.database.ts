import { Growdever } from "../../models/growdever.model";
import { DatabaseConnection } from "../config/database.connection";
import { GrowdeverEntity } from "../entities/growdever.entity";
import { growdevers } from "../growdevers";
import { SkillDatabase } from "./skill.database";

export class GrowdeverDatabase {
    private repository =
        DatabaseConnection.connection.getRepository(GrowdeverEntity);

    public async list(idade?: number): Promise<Growdever[]> {
        const result = await GrowdeverEntity.find({
            where: {
                idade,
            },
            relations: ["skills"],
        });

        console.log(result);

        return result.map((growdever: any) => this.mapEntityToModel(growdever));
    }

    private mapEntityToModel(entity: GrowdeverEntity): Growdever {
        const skillsEntity = entity.skills ?? [];

        const skills = skillsEntity.map((item) =>
            SkillDatabase.mapEntityToModel(item)
        );

        return Growdever.create(
            entity.id.trim(),
            entity.nome,
            entity.idade,
            "indefinido",
            entity.cpf,
            "indefinido",
            skills
        );
    }

    public async get(id: string) {
        const result = await this.repository.findOneBy({
            id,
        });

        if (result === null) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    public getByCpf(cpf: number) {
        return growdevers.find((growdever) => growdever.cpf === cpf);
    }

    // public getIndex(id: string) {
    //     return growdevers.findIndex((growdever) => growdever.id === id);
    // }

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

    public getLogin(cpf: number, password: string) {
        return growdevers.find(
            (growdever) =>
                growdever.cpf === cpf && growdever.password === password
        );
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
