import sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME } =
  process.env;

const db = new sequelize(MYSQL_DBNAME || "getjadwal", MYSQL_USER || "root", MYSQL_PASSWORD || "", {
  host: MYSQL_HOST || "localhost",
  port: MYSQL_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === "production" ? false : console.log,
});

export default db;
