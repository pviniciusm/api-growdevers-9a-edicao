import { v4 as createUuid } from "uuid";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { Skill } from "./skill.model";
import { Project } from "./project.model";

export class Growdever {
    private _id: string;

    constructor(
        private _nome: string,
        private _idade: number,
        private _cidade: string,
        private _cpf: number,
        private _password: string,
        private _skills?: Skill[],
        public _projects?: Project[]
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

    // getter
    public get cidade() {
        return this._cidade;
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

    public set skills(skills: Skill[]) {
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
            cidade: this._cidade,
            cpf: cpfValidator.format(this._cpf.toString().padStart(11, "0")),
            skills: this.skills,
            projects: this._projects,
        };
    }

    public static create(
        id: string,
        nome: string,
        idade: number,
        cidade: string,
        cpf: number,
        password: string,
        skills?: Skill[]
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
