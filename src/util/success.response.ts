import { Response } from "express";

export class SuccessResponse {
    public static ok(res: Response, message: string, data: any) {
        return res.status(200).send({
            ok: true,
            message,
            data,
        });
    }

    public static created(res: Response, message: string, data: any) {
        return res.status(201).send({
            ok: true,
            message,
            data,
        });
    }
}
