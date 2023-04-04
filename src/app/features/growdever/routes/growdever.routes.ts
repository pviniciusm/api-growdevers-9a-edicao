import { NextFunction, Request, Response, Router } from "express";
import { GrowdeverController } from "../controllers/growdever.controller";
import { SkillsController } from "../../skill/controllers/skills.controller";
import { CpfValidatorMiddleware } from "../../../shared/middlewares/cpf-validator.middleware";
import { GrowdeverValidatorMiddleware } from "../../../shared/middlewares/growdever-validator.middleware";

import {
    logMethodMiddleware,
    LogMiddleware,
} from "../../../shared/middlewares/log.middleware";

const middlewaresForMethodAndLog = [
    logMethodMiddleware,
    LogMiddleware.logMiddleware,
];

// http://localhost:3333/growdever
export const growdeverRoutes = () => {
    const app = Router();

    // GET http://localhost:3333/growdever
    app.get("/", new GrowdeverController().list);

    // GET http://localhost:3333/growdever/1234abc
    app.get(
        "/:growdeverId",
        LogMiddleware.logMiddleware,
        new GrowdeverController().get
    );

    // POST http://localhost:3333/growdever
    app.post(
        "/",
        [
            GrowdeverValidatorMiddleware.validateMandatoryFields,
            CpfValidatorMiddleware.cpfValidMiddleware,
            CpfValidatorMiddleware.cpfAlreadyExists,
        ],
        new GrowdeverController().create
    );

    // DELETE http://localhost:3333/growdever/abc-1234
    app.delete(
        "/:id",
        LogMiddleware.logMiddleware,
        new GrowdeverController().delete
    );

    // PUT http://localhost:3333/growdever/abc-1234
    app.put("/:id", new GrowdeverController().update);

    // POST http://localhost:3333/growdever/login
    app.post(
        "/login",
        [GrowdeverValidatorMiddleware.validateLoginFields],
        new GrowdeverController().login
    );

    // POST http://localhost:3333/growdever/123abc/skill
    app.post("/:id/skill", new SkillsController().create);

    // DELETE http://localhost:3333/growdever/123abc/skill/nodejs
    // app.delete("/:id/skill/:skill", new SkillsController().delete);

    // POST http://localhost:3333/growdever/123abc/skill
    app.get("/:id/skill", new SkillsController().list);

    return app;
};
