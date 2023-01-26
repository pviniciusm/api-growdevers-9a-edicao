import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/growdever.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { Growdever } from "../models/growdever.model";
import { SuccessResponse } from "../util/success.response";

export class GrowdeverController {
    public list(req: Request, res: Response) {
        try {
            const { idade } = req.query;

            const database = new GrowdeverDatabase();
            let growdevers = database.list();

            if (idade) {
                growdevers = growdevers.filter(
                    (growdever) => growdever.idade === Number(idade)
                );
            }

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

    public get(req: Request, res: Response) {
        try {
            const { growdeverId } = req.params;

            const database = new GrowdeverDatabase();
            const growdever = database.get(growdeverId);

            if (!growdever) {
                return RequestError.notFound(res, "Growdever");
            }

            res.status(200).send({
                ok: true,
                message: "Growdever successfully obtained",
                data: growdever,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { nome, idade, cidade, cpf, skills } = req.body;

            const growdever = new Growdever(nome, idade, cidade, cpf, skills);

            const database = new GrowdeverDatabase();
            database.create(growdever);

            return SuccessResponse.created(
                res,
                "Growdever was successfully create",
                growdever
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const database = new GrowdeverDatabase();
            const growdeverIndex = database.getIndex(id);

            if (growdeverIndex < 0) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            database.delete(growdeverIndex);

            // return res.status(200).send({
            //     ok: true,
            //     message: "Growdever successfully deleted",
            // });

            return SuccessResponse.ok(
                res,
                "Growdever was successfully deleted",
                growdeverIndex
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idade } = req.body;

            const database = new GrowdeverDatabase();
            const growdever = database.get(id);

            if (!growdever) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            if (idade) {
                growdever.idade = idade;
            }

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully updated",
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
