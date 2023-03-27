import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/repositories/growdever.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { Growdever } from "../models/growdever.model";
import { SuccessResponse } from "../util/success.response";

export class GrowdeverController {
    public async list(req: Request, res: Response) {
        try {
            const { idade } = req.query;

            const database = new GrowdeverDatabase();
            // let growdevers = await database.list(
            //     idade ? Number(idade) : undefined
            // );

            let growdevers = await database.listEntity();

            // if (idade) {
            //     growdevers = growdevers.filter(
            //         (growdever) => growdever.idade === Number(idade)
            //     );
            // }

            const result = growdevers.map((growdever) => growdever.toJson());

            res.status(200).send({
                ok: true,
                message: "Growdevers successfully listed",
                data: result,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const { growdeverId } = req.params;

            const database = new GrowdeverDatabase();
            const growdever = await database.get(growdeverId);

            if (!growdever) {
                return RequestError.notFound(res, "Growdever");
            }

            res.status(200).send({
                ok: true,
                message: "Growdever successfully obtained",
                data: growdever.toJson(),
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { nome, idade, cidade, cpf, password, skills } = req.body;

            const growdever = new Growdever(
                nome,
                idade,
                cidade,
                cpf,
                password,
                skills
            );

            const database = new GrowdeverDatabase();
            const result = await database.create(growdever);

            return SuccessResponse.created(
                res,
                "Growdever was successfully create",
                result
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const database = new GrowdeverDatabase();
            const growdever = await database.get(id);

            if (!growdever) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            await database.delete(growdever.id);

            return SuccessResponse.ok(
                res,
                "Growdever was successfully deleted",
                growdever
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idade } = req.body;

            const database = new GrowdeverDatabase();
            const growdever = await database.get(id);

            if (!growdever) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            growdever.idade = idade;

            await database.update(growdever.id, growdever.idade);

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully updated",
                data: growdever,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public login(req: Request, res: Response) {
        try {
            const { cpf, password } = req.body;

            const database = new GrowdeverDatabase();
            let growdever = database.getByCpf(cpf);

            if (!growdever) {
                return RequestError.unauthorized(res);
            }

            if (growdever.password !== password) {
                return RequestError.forbidden(res);
            }

            // to-do
            // Criar um token de autenticação

            return SuccessResponse.ok(res, "Login successfully done", {
                id: growdever.id,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
