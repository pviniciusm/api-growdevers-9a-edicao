import { Return } from "../../../shared/util/usecase.return";
import { GrowdeverRepository } from "../repositories/growdever.repository";

// interface DeleteGrowdeverUseCaseParams {
//     id: string;
// }

export class DeleteGrowdeverUsecase {
    public async execute(id: string): Promise<Return> {
        const database = new GrowdeverRepository();
        const result = await database.delete(id);

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
