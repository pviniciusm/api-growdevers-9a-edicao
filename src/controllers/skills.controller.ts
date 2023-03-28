import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/repositories/growdever.database";
import { SkillDatabase } from "../database/repositories/skill.database";
import { RequestError } from "../errors/request.error";
import { Skill } from "../models/skill.model";

export class SkillsController {
    // http://localhost:3333/growdever/5bd700e3-88ea-453a-ba62-27633d4a1f8b/skill
    public async create(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, arquivada } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Nome was not provided",
                });
            }

            if (arquivada === undefined) {
                return res.status(400).send({
                    ok: false,
                    message: "Arquivada was not provided",
                });
            }

            const growdeverDatabase = new GrowdeverDatabase();
            const growdever = await growdeverDatabase.get(id);

            if (!growdever) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            const database = new SkillDatabase();
            const result = await database.create(
                id,
                new Skill(nome, arquivada)
            );

            return res.status(201).send({
                ok: true,
                message: "Skills success created",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const database = new SkillDatabase();
            const result = await database.list();

            return res.status(200).send({
                ok: true,
                message: "Skills success listed",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // http://localhost:3333/growdever/5bd700e3-88ea-453a-ba62-27633d4a1f8b/skill/nodejs
    // public async delete(req: Request, res: Response) {
    //     try {
    //         const { id, skill } = req.params;
    //         const database = new GrowdeverDatabase();

    //         const growdever = await database.get(id);

    //         if (!growdever) {
    //             return RequestError.notFound(res, "Growdever");
    //         }

    //         const skillIndex = growdever.skills.findIndex(
    //             (item) => item === skill
    //         );
    //         if (skillIndex < 0) {
    //             return RequestError.notFound(res, "Skill");
    //         }

    //         growdever.skills.splice(skillIndex, 1);

    //         return res.status(200).send({
    //             ok: true,
    //             message: "Skill deleted",
    //             data: growdever,
    //         });
    //     } catch (error: any) {
    //         return res.status(500).send({
    //             ok: false,
    //             message: error.toString(),
    //         });
    //     }
    // }
}
