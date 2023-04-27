import { Growdever } from "../../../models/growdever.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import { CreateGrowdeverUsecase } from "../usecases/create-growdever.usecase";
import { DeleteGrowdeverUsecase } from "../usecases/delete-growdever.usecase";
import { CreateGrowdeverRepositoryContract } from "./growdever-repository.contract";

class GrowdeverPrismaRepository implements CreateGrowdeverRepositoryContract {
    public async create(growdever: Growdever): Promise<Growdever> {
        // .. criar com o ORM Prisma

        return new Growdever("abc", 20, "city", 20, "abc");
    }
}

export const createGrowdeverUsecaseFactory = () => {
    const database = new GrowdeverRepository();
    // const prismaDatabase = new GrowdeverPrismaRepository();
    const cache = new CacheRepository();

    return new CreateGrowdeverUsecase(database, cache);
};

export const deleteGrowdeverUsecaseFactory = () => {
    const database = new GrowdeverRepository();

    return new DeleteGrowdeverUsecase(database);
};
