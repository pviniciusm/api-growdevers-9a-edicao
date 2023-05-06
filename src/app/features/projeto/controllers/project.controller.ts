import { Request, Response } from "express";
import { ServerError } from "../../../shared/errors/server.error";
import { CreateProjectUsecase } from "../usecases/create-project.usecase";
import { GrowdeverRepository } from "../../growdever/repositories/growdever.repository";
import { ProjectRepository } from "../repositories/project.repository";

export class ProjectController {
    public async create(req: Request, res: Response) {
        try {
            const { nome, dtEntrega } = req.body;
            const { idGrowdever } = req.params;

            // criar o usecase
            const growdeverRepository = new GrowdeverRepository();
            const projectRepository = new ProjectRepository();

            const usecase = new CreateProjectUsecase(
                growdeverRepository,
                projectRepository,
                projectRepository
            );
            const result = await usecase.execute({
                nome,
                dataEntrega: dtEntrega,
                idGrowdever,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
