import { NextFunction, Request, Response, Router } from "express";
import { GrowdeverController } from "../controllers/growdever.controller";
import { SkillsController } from "../../skill/controllers/skills.controller";
import { CpfValidatorMiddleware } from "../../../shared/middlewares/cpf-validator.middleware";
import { GrowdeverValidatorMiddleware } from "../../../shared/middlewares/growdever-validator.middleware";

import {
    logMethodMiddleware,
    LogMiddleware,
} from "../../../shared/middlewares/log.middleware";
import { skillRoutes } from "../../skill/routes/skill.routes";
import { projectRoutes } from "../../projeto/routes/project.routes";

const middlewaresForMethodAndLog = [
    logMethodMiddleware,
    LogMiddleware.logMiddleware,
];

export const growdeverRoutes = () => {
    const app = Router();

    app.get("/", new GrowdeverController().list);

    app.get(
        "/:growdeverId",
        LogMiddleware.logMiddleware,
        new GrowdeverController().get
    );

    app.post(
        "/",
        [
            GrowdeverValidatorMiddleware.validateMandatoryFields,
            CpfValidatorMiddleware.cpfValidMiddleware,
            CpfValidatorMiddleware.cpfAlreadyExists,
        ],
        new GrowdeverController().create
    );

    app.delete(
        "/:id",
        LogMiddleware.logMiddleware,
        new GrowdeverController().delete
    );

    app.put("/:id", new GrowdeverController().update);

    app.post(
        "/login",
        [GrowdeverValidatorMiddleware.validateLoginFields],
        new GrowdeverController().login
    );

    app.use("/:id/skill", skillRoutes());
    app.use("/:id/project", projectRoutes());

    return app;
};
