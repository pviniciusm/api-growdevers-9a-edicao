import { DatabaseConnection } from "../database/typeorm.connection";
import { createApp } from "../config/express.config";
import { serverEnv } from "../../app/envs/server.env";
import { RedisConnection } from "../database/redis.connection";
import { Express } from "express";

export class AppServer {
    private static app: Express;

    public static async run() {
        AppServer.app = createApp();

        Promise.all([
            DatabaseConnection.connect(),
            RedisConnection.connect(),
        ]).then(this.listen);
    }

    private static listen() {
        AppServer.app.listen(serverEnv.port, () => {
            console.log(`API is running (${process.env.PORT})`);
        });
    }
}
