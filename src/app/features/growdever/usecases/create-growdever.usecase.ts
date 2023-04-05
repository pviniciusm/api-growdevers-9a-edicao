import { Growdever } from "../../../models/growdever.model";
import { Return } from "../../../shared/util/usecase.return";
import { GrowdeverRepository } from "../repositories/growdever.repository";

interface CreateGrowdeverParams {
    nome: string;
    idade: number;
    cidade: string;
    cpf: number;
    password: string;
}

export class CreateGrowdeverUsecase {
    public async execute(data: CreateGrowdeverParams): Promise<Return> {
        let erros: string[] = [];

        if (data.idade < 18 || data.idade > 99) {
            // return {
            //     ok: false,
            //     message: "Idade is invalid",
            //     code: 400,
            // };
            erros.push("Idade is invalid");
        }

        if (data.nome.length < 6) {
            // return {
            //     ok: false,
            //     message: "Nome must be greater than 6 characters",
            //     code: 400,
            // };

            erros.push("Nome must be greater than 6 characters");
        }

        if (erros.length > 0) {
            return {
                ok: false,
                message: `Os seguintes erros aconteceram: ${erros.join(", ")}`,
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

        const database = new GrowdeverRepository();
        const result = await database.create(growdever);

        return {
            ok: true,
            data: result.toJson(),
            message: "Growdever was successfully created",
            code: 201,
        };
    }
}
