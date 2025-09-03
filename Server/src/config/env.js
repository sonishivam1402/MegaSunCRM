import { config } from "dotenv";

config({path :`.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
    PORT, SERVER_URL,
    NODE_ENV,
    JWT_SECRET, JWT_EXPIRES_IN,
    DB_USER, DB_PASSWORD, DB_PORT, DB_SERVER, DB_DATABASE, DB_ENCRYPT, DB_TRUST_SERVER_CERT 
    }=process.env;