import { Growdever } from "../../../models/growdever.model";

export interface CreateGrowdeverRepositoryContract {
    create: (growdever: Growdever) => Promise<Growdever>;
}

export interface DeleteGrowdeverRepositoryContract {
    delete: (id: string) => Promise<number>;
}

export interface ListGrowdeverRepositoryParams {
    idade?: number;
    nome: string;
}

export interface ListGrowdeverRepositoryContract {
    list: (idade?: ListGrowdeverRepositoryParams) => Promise<any[]>;
}

export interface GetGrowdeverRepositoryContract {
    get: (id: string) => Promise<Growdever | null>;
}
