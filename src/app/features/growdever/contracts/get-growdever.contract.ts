import { Growdever } from "../../../models/growdever.model";

export interface GetGrowdeverContract {
    get: (id: string) => Promise<Growdever | null>;
}
