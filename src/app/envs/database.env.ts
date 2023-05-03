import * as dotenv from "dotenv";
dotenv.config();

export const databaseEnv = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    apiEnv: process.env.API_ENV,
};
