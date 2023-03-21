import { Growdever } from "../models/growdever.model";
import { DatabaseConnection } from "./database.connection";
import { growdevers } from "./growdevers";

export class GrowdeverDatabase {
    public async list(idade?: number): Promise<Growdever[]> {
        let query = "select * from growdevers.growdever";

        if (idade) {
            query += ` where idade = ${idade}`;
        }

        const result = await DatabaseConnection.connection.query(query);

        return result.rows.map((row) => this.mapToModel(row));
    }

    private mapToModel(row: any): Growdever {
        return Growdever.create(
            row.id.trim(),
            row.nome,
            row.idade,
            row.cidade,
            row.cpf,
            row.password
        );
    }

    public async get(id: string) {
        const result = await DatabaseConnection.connection.query(
            `select * from growdevers.growdever where id = '${id}'`
        );

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return this.mapToModel(row);
    }

    public getByCpf(cpf: number) {
        return growdevers.find((growdever) => growdever.cpf === cpf);
    }

    // public getIndex(id: string) {
    //     return growdevers.findIndex((growdever) => growdever.id === id);
    // }

    public async create(growdever: Growdever) {
        let query = `insert into growdevers.growdever `;
        query += `(nome, cpf, idade, nota, ind_ativo, dt_nascimento) `;
        query += `values `;
        query += `('${growdever.nome}', ${growdever.cpf}, ${growdever.idade}, 8, true, '1980-11-20') `;

        await DatabaseConnection.connection.query(query);

        const result = await DatabaseConnection.connection.query(
            `select * from growdevers.growdever where cpf = '${growdever.cpf}'`
        );
        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return this.mapToModel(row);
    }

    public async createWithId(growdever: Growdever) {
        let query = `insert into growdevers.growdever `;
        query += `(id, nome, cpf, idade, nota, ind_ativo, dt_nascimento) `;
        query += `values `;
        query += `('${growdever.id}', '${growdever.nome}', ${growdever.cpf}, ${growdever.idade}, 8, true, '1980-11-20') `;

        await DatabaseConnection.connection.query(query);
    }

    public async delete(id: string) {
        await DatabaseConnection.connection.query(
            `delete from growdevers.growdever where id = '${id}'`
        );
    }

    public getLogin(cpf: number, password: string) {
        return growdevers.find(
            (growdever) =>
                growdever.cpf === cpf && growdever.password === password
        );
    }

    public async update(id: string, idade: number) {
        let query = `update growdevers.growdever `;
        query += `set idade = ${idade}, dthr_atualizacao = current_timestamp `;
        query += `where id = '${id}' `;

        await DatabaseConnection.connection.query(query);
    }
}
