import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "developement"}.local` });

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;

export { PORT, NODE_ENV, DB_URL };
