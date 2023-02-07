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
            const { nome, idade, cidade, password } = req.body;

            if (!nome) {
                return RequestError.fieldNotProvided(res, "Nome");
            }

            if (!idade) {
                return RequestError.fieldNotProvided(res, "Idade");
            }

            if (!cidade) {
                return RequestError.fieldNotProvided(res, "Cidade");
            }

            if (!password) {
                return RequestError.fieldNotProvided(res, "Password");
            }

            next();
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public static validateLoginFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { cpf, password } = req.body;

            if (!cpf) {
                return RequestError.fieldNotProvided(res, "CPF");
            }

            if (!password) {
                return RequestError.fieldNotProvided(res, "Password");
            }

            next();
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
