import mysql from "mysql2/promise";
import { logger } from "../utils";
import CustomError from "../common/custom-error";

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: +process.env.DB_PORT!,
  connectionLimit: 10,
};

const pool = mysql.createPool(poolConfig);

const initializeDatabase = async () => {
  try {
    await pool.query("SELECT 1");
    logger.info("Database connection established successfully.");
  } catch (e: any) {
    logger.error(`Database connection failed: ${e.message}`);
    throw new CustomError(`Failed to connect to the database: ${e.message}`);
  }
};

export { pool, initializeDatabase };
