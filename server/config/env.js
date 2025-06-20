// environment variables configuration
import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "developement"}.local` });

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const ARCJET_KEY = process.env.ARCJET_KEY;
const ARCJET_ENV = process.env.ARCJET_ENV;

export {
  PORT,
  NODE_ENV,
  DB_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
};
