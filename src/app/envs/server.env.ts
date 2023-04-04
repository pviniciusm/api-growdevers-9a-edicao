import * as dotenv from "dotenv";
dotenv.config();

export const serverEnv = {
    port: process.env.PORT,
};
