import { Pool } from "pg";

import * as dotenv from "dotenv";
dotenv.config();

export default new Pool({
    port: 5432,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
});
