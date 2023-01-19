import express from "express";
import { GrowdeverController } from "./controllers/growdever.controller";
import { GrowdeverDatabase } from "./database/growdever.database";

const app = express();
app.use(express.json());

// GET http://localhost:3333
app.get("/", (req, res) => {
    res.send({
        ok: true,
        message: "Tudo ok",
    });
});

// GET http://localhost:3333/growdever
app.get("/growdever", (req, res) => {
    const controller = new GrowdeverController();
    return controller.list(req, res);
});

// GET http://localhost:3333/growdever/abc-1234
app.get("/growdever/:growdeverId", new GrowdeverController().get);

// POST http://localhost:3333/growdever
app.post("/growdever", new GrowdeverController().create);

// DELETE http://localhost:3333/growdever/abc-1234
app.delete("/growdever/:id", new GrowdeverController().delete);

// PUT http://localhost:3333/growdever/abc-1234
app.put("/growdever/:id", new GrowdeverController().update);

// http://localhost:3333
app.listen(3333, () => {
    console.log("API está rodando!");
});
