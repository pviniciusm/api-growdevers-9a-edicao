import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/growdever.database";
import { growdevers } from "../database/growdevers";
import { Growdever } from "../models/growdever.model";

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
            return res.status(500).send({
                ok: false,
                message: error,
            });
        }
    }

    public get(req: Request, res: Response) {
        try {
            const { growdeverId } = req.params;

            const database = new GrowdeverDatabase();
            const growdever = database.get(growdeverId);

            if (!growdever) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            res.status(200).send({
                ok: true,
                message: "Growdever successfully obtained",
                data: growdever,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error,
            });
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { nome, idade, cidade, skills } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Nome was not provided",
                });
            }

            if (!idade) {
                return res.status(400).send({
                    ok: false,
                    message: "Idade was not provided",
                });
            }

            if (!cidade) {
                return res.status(400).send({
                    ok: false,
                    message: "Bah! Deu ruim",
                });
            }

            const growdever = new Growdever(nome, idade, cidade, skills);

            const database = new GrowdeverDatabase();
            database.create(growdever);

            res.status(201).send({
                ok: true,
                message: "Growdever successfully created",
                data: growdever,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
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

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully deleted",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
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
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
