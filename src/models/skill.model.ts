import { v4 as createUuid } from "uuid";

export class Skill {
    public id: string;

    constructor(public nome: string, public arquivada: string) {
        this.id = createUuid();
    }

    public static create(id: string, nome: string, arquivada: string) {
        const skill = new Skill(nome, arquivada);
        skill.id = id;

        return skill;
    }
}
