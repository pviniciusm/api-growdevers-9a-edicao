import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
dotenv.config();

export default new DataSource({
    type: "postgres",
    port: 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    entities: ["src/database/entities/**/*.ts"],
    schema: "growdevers",
});
