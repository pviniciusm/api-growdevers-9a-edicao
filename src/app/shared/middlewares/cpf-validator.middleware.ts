import { NextFunction, Request, Response } from "express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { ServerError } from "../errors/server.error";
import { GrowdeverRepository } from "../../features/growdever/repositories/growdever.repository";
import { RequestError } from "../errors/request.error";

export class CpfValidatorMiddleware {
    public static cpfValidMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { cpf } = req.body;

            if (!cpf) {
                return RequestError.fieldNotProvided(res, "CPF");
            }

            const cpfText = cpf.toString().padStart(11, "0");

            let isValid = cpfValidator.isValid(cpfText);
            if (!isValid) {
                return res.status(400).send({
                    ok: false,
                    message: "CPF is invalid",
                });
            }

            next();
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public static async cpfAlreadyExists(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { cpf } = req.body;

            const database = new GrowdeverRepository();
            const growdever = await database.getByCpf(cpf);

            if (growdever) {
                return res.status(400).send({
                    ok: false,
                    message: "Growdever already exists",
                });
            }

            next();
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
