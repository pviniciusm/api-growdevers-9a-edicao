import { v4 as createUuid } from "uuid";

export class Growdever {
    private _id: string;

    constructor(
        private _nome: string,
        private _idade: number,
        private _cidade: string,
        private _skills?: string[]
    ) {
        this._id = createUuid();
    }

    // getter
    public get idade() {
        return this._idade;
    }

    // setter
    public set idade(idade: number) {
        this._idade = idade;
    }

    public get id() {
        return this._id;
    }

    public get skills() {
        return this._skills ?? [];
    }

    public set skills(skills: string[]) {
        this._skills = skills;
    }

    public toJson() {
        return {
            id: this._id,
            nome: this._nome,
            idade: this._idade,
            // cidade: this._cidade,
            skills: this.skills,
        };
    }
}
