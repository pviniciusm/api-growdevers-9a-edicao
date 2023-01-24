import { Router } from "express";
import { GrowdeverController } from "../controllers/growdever.controller";
import { SkillsController } from "../controllers/skills.controller";

// http://localhost:3333/growdever
export const growdeverRoutes = () => {
    const app = Router();

    // GET http://localhost:3333/growdever
    app.get("/", new GrowdeverController().list);

    // GET http://localhost:3333/growdever/abc-1234
    app.get("/:growdeverId", new GrowdeverController().get);

    // POST http://localhost:3333/growdever
    app.post("/", new GrowdeverController().create);

    // DELETE http://localhost:3333/growdever/abc-1234
    app.delete("/:id", new GrowdeverController().delete);

    // PUT http://localhost:3333/growdever/abc-1234
    app.put("/:id", new GrowdeverController().update);

    // POST http://localhost:3333/growdever/123abc/skill
    app.post("/:id/skill", new SkillsController().create);

    // DELETE http://localhost:3333/growdever/123abc/skill/nodejs
    app.delete("/:id/skill/:skill", new SkillsController().delete);

    return app;
};
