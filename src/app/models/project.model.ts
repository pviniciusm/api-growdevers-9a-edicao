import { Growdever } from "./growdever.model";
import { v4 as createUuid } from "uuid";

export class Project {
    public id: string;
    public indAtivo: boolean = true;

    constructor(
        public nome: string,
        public dtEntrega: Date,
        public growdever: Growdever
    ) {
        this.id = createUuid();
    }

    public static create(
        id: string,
        nome: string,
        indAtivo: boolean,
        dtEntrega: Date,
        growdever: Growdever
    ) {
        const project = new Project(nome, dtEntrega, growdever);
        project.id = id;
        project.indAtivo = indAtivo;

        return project;
    }
}
