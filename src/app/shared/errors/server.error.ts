import { Response } from "express";

export class ServerError {
    public static genericError(res: Response, error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
