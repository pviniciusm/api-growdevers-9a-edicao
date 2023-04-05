import { Request, Response } from "express";
import { RequestError } from "../../../shared/errors/request.error";
import { ServerError } from "../../../shared/errors/server.error";
import { SuccessResponse } from "../../../shared/util/success.response";
import { Growdever } from "../../../models/growdever.model";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import { CreateGrowdeverUsecase } from "../usecases/create-growdever.usecase";

export class GrowdeverController {
    public async list(req: Request, res: Response) {
        try {
            const { idade } = req.query;

            const database = new GrowdeverRepository();
            let growdevers = await database.list(
                idade ? Number(idade) : undefined
            );

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

            const database = new GrowdeverRepository();
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
            const { nome, idade, cidade, cpf, password } = req.body;

            const result = await new CreateGrowdeverUsecase().execute({
                nome,
                idade,
                cidade,
                cpf,
                password,
            });

            return res.status(result.code).send({
                ok: result.ok,
                message: result.message,
                data: result.data,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const database = new GrowdeverRepository();
            const result = await database.delete(id);

            if (result === 0) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            return SuccessResponse.ok(
                res,
                "Growdever was successfully deleted",
                id
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idade } = req.body;

            const database = new GrowdeverRepository();
            const result = await database.updateWithSave(id, idade);

            if (result === 0) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully updated",
                data: id,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { cpf, password } = req.body;

            const database = new GrowdeverRepository();
            let growdever = await database.getByCpf(cpf);

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
