import { Response } from "express";

export class RequestError {
    public static fieldNotProvided(res: Response, field: string) {
        return res.status(400).send({
            ok: false,
            message: field + " was not provided",
        });
    }

    public static invalidValue(res: Response, field: string) {
        return res.status(400).send({
            ok: false,
            message: field + " is invalid",
        });
    }

    public static notFound(res: Response, entity: string) {
        return res.status(404).send({
            ok: false,
            message: entity + " not found",
        });
    }

    public static unauthorized(res: Response) {
        return res.status(401).send({
            ok: false,
            message: "Access not authorized",
        });
    }

    public static forbidden(res: Response) {
        return res.status(403).send({
            ok: false,
            message: "Access not authorized",
        });
    }
}
