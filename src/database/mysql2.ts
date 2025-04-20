import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  user: "root",
  database: "notelist",
  host: "localhost",
  port: 3306,
  password: "",
  connectionLimit: 50,
  waitForConnections: true,
};

export const conn = mysql.createPool(access);
