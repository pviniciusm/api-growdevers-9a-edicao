import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/usecase.return";
import { GrowdeverRepository } from "../repositories/growdever.repository";

interface ListGrowdeversParams {
    idade?: number;
}

const growdeverListCacheKey = "growdevers";

export class ListGrowdeversUsecase {
    public async execute(data: ListGrowdeversParams): Promise<Return> {
        const cacheRepository = new CacheRepository();
        const cachedResult = await cacheRepository.get<any>(
            growdeverListCacheKey
        );

        if (cachedResult !== null) {
            return {
                ok: true,
                code: 200,
                message: "Growdevers successfully listed - cache",
                data: cachedResult,
            };
        }

        const database = new GrowdeverRepository();
        let growdevers = await database.list(data.idade);

        const result = growdevers.map((growdever) => growdever.toJson());

        await cacheRepository.setEx(growdeverListCacheKey, result, 3600);

        return {
            ok: true,
            code: 200,
            message: "Growdevers successfully listed",
            data: result,
        };
    }
}
