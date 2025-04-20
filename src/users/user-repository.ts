import { ResponseError } from "../utils/response-error.ts";
import { conn } from "../database/mysql2.ts";

export const findUserDataLogin = async (reqId: string, email: string) => {
  try {
    let result;
    if (process.env.SQL_INJECTION == "true") {
      result = await conn.query(
        `SELECT user_id AS userId,email, password from users where email = '${email}'`
      );
    } else {
      result = await conn.execute(
        `SELECT user_id AS userId, name, email from users where email = ? `,
        [email]
      );
    }

    // const resultData = (result as any)[0][0];
    // const resultMetaData = (result as any)[1][0];

    return (result as any)[0][0];
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (reqId: string, email: string) => {
  try {
    let result;
    if (process.env.SQL_INJECTION == "true") {
      result = await conn.query(
        `SELECT user_id AS userId, name, email from users where email = '${email}'`
      );
    } else {
      result = await conn.execute(
        `SELECT user_id AS userId, name, email from users where email = ? `,
        [email]
      );
    }
    return (result as any)[0][0];
  } catch (error) {
    throw error;
  }
};

export const findUserByUserId = async (reqId: string, userId: number) => {
  try {
    let result;
    if (process.env.SQL_INJECTION == "true") {
      result = await conn.query(
        `SELECT user_id AS userId, name, email from users where user_id = ${userId}`
      );
    } else {
      result = await conn.execute(
        `SELECT user_id AS userId, name, email from users where user_id = ?`,
        [userId]
      );
    }
    return (result as any)[0][0];
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (
  reqId: string,
  userId: number,
  name: string,
  email: string
) => {
  try {
    let result;
    if (process.env.SQL_INJECTION == "true") {
      result = await conn.query(
        `Update users set name = '${name}', email = '${email}' where user_id = ${userId}`
      );
    } else {
      result = await conn.execute(
        `Update users set name = ?, email = ? where user_id = ?`,
        [name, email, userId]
      );
    }
    return (result as any)[0];
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  reqId: string,
  name: string,
  email: string,
  password: string
) => {
  try {
    const result = await conn.query(
      `INSERT into users(name,email,password) values('${name}', '${email}', '${password}')`
    );
    return result;
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new ResponseError(409, "email telah terdaftar");
    }
    throw error;
  }
};

export const findAllUsers = async (reqId: string) => {
  try {
    const result = await conn.execute(
      "SELECT user_id AS userId, name, email FROM users"
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};
