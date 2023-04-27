import { Skill } from "../../../models/skill.model";
import { Return } from "../../../shared/util/usecase.return";
import { GetGrowdeverRepositoryContract } from "../../growdever/util/growdever-repository.contract";
import { SkillRepositoryContract } from "../util/skill-repository.contract";

interface CreateSkillParams {
    id: string;
    nome: string;
    arquivada: string;
}

export class CreateSkillUsecase {
    constructor(
        private growdeverDatabase: GetGrowdeverRepositoryContract,
        private database: SkillRepositoryContract
    ) {}

    public async execute(data: CreateSkillParams): Promise<Return> {
        // const growdeverDatabase = new GrowdeverRepository();
        const growdever = await this.growdeverDatabase.get(data.id);

        if (!growdever) {
            return {
                ok: false,
                message: "Growdever not found",
                code: 404,
            };
        }

        // const database = new SkillRepository();
        const result = await this.database.create(
            data.id,
            new Skill(data.nome, data.arquivada)
        );

        return {
            ok: true,
            message: "Skills success created",
            data: result,
            code: 201,
        };
    }
}
