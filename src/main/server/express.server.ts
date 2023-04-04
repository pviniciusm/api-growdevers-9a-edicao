import { DatabaseConnection } from "../database/typeorm.connection";
import { createApp } from "../config/express.config";
import { serverEnv } from "../../app/envs/server.env";

export class AppServer {
    public static async run() {
        const app = createApp();

        DatabaseConnection.connect().then(() => {
            app.listen(serverEnv.port, () => {
                console.log(
                    `API está rodando na porta.... ${process.env.PORT}!`
                );
            });
        });
    }
}
