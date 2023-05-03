import { Growdever } from "../../../models/growdever.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { CacheRepositoryContract } from "../../../shared/util/cache-repository.contract";
import { Return } from "../../../shared/util/usecase.return";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import { CreateGrowdeverRepositoryContract } from "../util/growdever-repository.contract";

interface CreateGrowdeverParams {
    nome: string;
    idade: number;
    cidade: string;
    cpf: number;
    password: string;
}

export class CreateGrowdeverUsecase {
    constructor(
        private database: CreateGrowdeverRepositoryContract,
        private cacheRepository: CacheRepositoryContract
    ) {}

    public async execute(data: CreateGrowdeverParams): Promise<Return> {
        if (data.idade < 18 || data.idade > 99) {
            return {
                ok: false,
                message: "Idade is invalid",
                code: 400,
            };
        }

        if (data.nome.length < 6) {
            return {
                ok: false,
                message: "Nome must be greater than 6 characters",
                code: 400,
            };
        }

        const growdever = new Growdever(
            data.nome,
            data.idade,
            data.cidade,
            data.cpf,
            data.password
        );

        // const database = new GrowdeverRepository();
        const result = await this.database.create(growdever);

        // const cacheRepository = new CacheRepository();
        await this.cacheRepository.delete("growdevers");

        return {
            ok: true,
            data: result.toJson(),
            message: "Growdever was successfully created",
            code: 201,
        };
    }
}
