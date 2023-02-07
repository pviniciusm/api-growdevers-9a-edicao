import { Growdever } from "../models/growdever.model";
import { growdevers } from "./growdevers";

export class GrowdeverDatabase {
    public list() {
        return [...growdevers];
    }

    public get(id: string) {
        return growdevers.find((growdever) => growdever.id === id);
    }

    public getByCpf(cpf: number) {
        return growdevers.find((growdever) => growdever.cpf === cpf);
    }

    public getIndex(id: string) {
        return growdevers.findIndex((growdever) => growdever.id === id);
    }

    public create(growdever: Growdever) {
        growdevers.push(growdever);
    }

    public delete(index: number) {
        growdevers.splice(index, 1);
    }

    public getLogin(cpf: number, password: string) {
        return growdevers.find(
            (growdever) =>
                growdever.cpf === cpf && growdever.password === password
        );
    }
}
