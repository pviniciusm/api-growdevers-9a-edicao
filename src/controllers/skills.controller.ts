import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/repositories/growdever.database";
import { RequestError } from "../errors/request.error";

export class SkillsController {
    // http://localhost:3333/growdever/5bd700e3-88ea-453a-ba62-27633d4a1f8b/skill
    public async create(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { skills } = req.body;
            const database = new GrowdeverDatabase();

            if (!skills) {
                return res.status(400).send({
                    ok: false,
                    message: "Skills were not provided",
                });
            }

            const growdever = await database.get(id);

            if (!growdever) {
                return res.status(404).send({
                    ok: false,
                    message: "Growdever not found",
                });
            }

            // CONCAT cria uma cópia mas não muda o array original
            growdever.skills = growdever.skills.concat(skills);

            // Outras opções para adicionar itens de um array em outro array:
            // growdever.skills.push(...skills);
            // growdever.skills = [...growdever.skills, ...skills];

            return res.status(201).send({
                ok: true,
                message: "Skills success created",
                data: growdever,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // http://localhost:3333/growdever/5bd700e3-88ea-453a-ba62-27633d4a1f8b/skill/nodejs
    public async delete(req: Request, res: Response) {
        try {
            const { id, skill } = req.params;
            const database = new GrowdeverDatabase();

            const growdever = await database.get(id);

            if (!growdever) {
                return RequestError.notFound(res, "Growdever");
            }

            const skillIndex = growdever.skills.findIndex(
                (item) => item === skill
            );
            if (skillIndex < 0) {
                return RequestError.notFound(res, "Skill");
            }

            growdever.skills.splice(skillIndex, 1);

            return res.status(200).send({
                ok: true,
                message: "Skill deleted",
                data: growdever,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
