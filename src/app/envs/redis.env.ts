import * as dotenv from "dotenv";
dotenv.config();

export const redisEnv = {
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS,
    port: process.env.REDIS_PORT,
};
