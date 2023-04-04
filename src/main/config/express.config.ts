import cors from "cors";
import express from "express";
import { growdeverRoutes } from "../../app/features/growdever/routes/growdever.routes";

export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/growdever", growdeverRoutes());

    return app;
};
