import express from "express";
import { growdeverRoutes } from "./routes/growdever.routes";

const app = express();
app.use(express.json());

app.use("/growdever", growdeverRoutes());

app.listen(3333, () => {
    console.log("API está rodando!");
});
