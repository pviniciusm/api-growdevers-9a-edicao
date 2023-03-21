import { v4 as createUuid } from "uuid";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class Growdever {
    private _id: string;

    constructor(
        private _nome: string,
        private _idade: number,
        private _cidade: string,
        private _cpf: number,
        private _password: string,
        private _skills?: string[]
    ) {
        this._id = createUuid();
    }

    public get password() {
        return this._password;
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

    public get cpf() {
        return this._cpf;
    }

    public get nome() {
        return this._nome;
    }

    public toJson() {
        return {
            id: this._id,
            nome: this._nome,
            idade: this._idade,
            cpf: cpfValidator.format(this._cpf.toString().padStart(11, "0")),
            skills: this.skills,
        };
    }

    public static create(
        id: string,
        nome: string,
        idade: number,
        cidade: string,
        cpf: number,
        password: string,
        skills?: string[]
    ) {
        const growdever = new Growdever(
            nome,
            idade,
            cidade,
            cpf,
            password,
            skills
        );
        growdever._id = id;

        return growdever;
    }
}
