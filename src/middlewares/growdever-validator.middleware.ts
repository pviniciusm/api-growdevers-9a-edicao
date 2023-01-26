import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class GrowdeverValidatorMiddleware {
    public static validateMandatoryFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { nome, idade, cidade } = req.body;

            if (!nome) {
                return RequestError.fieldNotProvided(res, "Nome");
            }

            if (!idade) {
                return RequestError.fieldNotProvided(res, "Idade");
            }

            if (!cidade) {
                return RequestError.fieldNotProvided(res, "Cidade");
            }

            next();
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
