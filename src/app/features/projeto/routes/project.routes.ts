import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

//   /user/:id/project   POST /

export const projectRoutes = () => {
    const router = Router({
        mergeParams: true,
    });

    router.post("/", new ProjectController().create);

    return router;
};
