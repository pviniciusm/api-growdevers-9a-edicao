import { DataSource } from "typeorm";
import { databaseEnv } from "../../app/envs/database.env";

export default new DataSource({
    type: "postgres",
    port: 5432,
    host: databaseEnv.host,
    username: databaseEnv.username,
    password: databaseEnv.password,
    database: databaseEnv.database,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    entities: ["src/app/shared/database/entities/**/*.ts"],
    migrations: ["src/app/shared/database/migrations/**/*.ts"],
    schema: "aula",
});
