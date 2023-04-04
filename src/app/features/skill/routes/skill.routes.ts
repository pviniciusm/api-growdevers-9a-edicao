import { Router } from "express";
import { SkillsController } from "../controllers/skills.controller";

export const skillRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    app.post("/", new SkillsController().create);
    app.get("/", new SkillsController().list);

    return app;
};
