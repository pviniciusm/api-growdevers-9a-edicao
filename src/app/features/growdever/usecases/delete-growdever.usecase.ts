import { Return } from "../../../shared/util/usecase.return";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import { DeleteGrowdeverRepositoryContract } from "../util/growdever-repository.contract";

// interface DeleteGrowdeverUseCaseParams {
//     id: string;
// }

export class DeleteGrowdeverUsecase {
    constructor(private database: DeleteGrowdeverRepositoryContract) {}

    public async execute(id: string): Promise<Return> {
        const result = await this.database.delete(id);

        if (result === 0) {
            return {
                ok: false,
                message: "Growdever not found",
                code: 404,
            };
        }

        return {
            ok: true,
            data: id,
            message: "Growdever was successfully deleted",
            code: 200,
        };
    }
}
