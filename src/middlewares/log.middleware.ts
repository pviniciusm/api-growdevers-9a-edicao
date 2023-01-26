import { Request, Response, NextFunction } from "express";

// Exemplo 1: exportando como uma classe
export class LogMiddleware {
    public static logMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        console.log("A rota foi executada!");
        console.log(req.hostname);
        console.log(req.ip);
        console.log(req.protocol);

        next();
    }

    public logMethodMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        console.log(`O método chamado foi ${req.method}`);

        next();
    }
}

// Exemplo 2: exportando como uma simples função
export const logMethodMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`O método chamado foi ${req.method}`);

    next();
};
