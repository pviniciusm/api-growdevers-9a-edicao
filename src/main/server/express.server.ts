import cors from "cors";
import express from "express";
import { growdeverRoutes } from "../../routes/growdever.routes";
import { DatabaseConnection } from "../database/typeorm.connection";

import * as dotenv from "dotenv";
dotenv.config();

export class AppServer {
    public static async run() {
        const app = express();
        app.use(express.json());
        app.use(cors());

        app.use("/growdever", growdeverRoutes());

        DatabaseConnection.connect().then(() => {
            app.listen(process.env.PORT, () => {
                console.log(
                    `API está rodando na porta.... ${process.env.PORT}!`
                );
            });
        });
    }
}
