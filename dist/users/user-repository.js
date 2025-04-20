import { ResponseError } from "../utils/response-error.js";
import { conn } from "../database/mysql2.js";
export const findUserDataLogin = async (reqId, email) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            result = await conn.query(`SELECT user_id AS userId,email, password from users where email = '${email}'`);
        }
        else {
            result = await conn.execute(`SELECT user_id AS userId, name, email from users where email = ? `, [email]);
        }
        // const resultData = (result as any)[0][0];
        // const resultMetaData = (result as any)[1][0];
        return result[0][0];
    }
    catch (error) {
        throw error;
    }
};
export const findUserByEmail = async (reqId, email) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            result = await conn.query(`SELECT user_id AS userId, name, email from users where email = '${email}'`);
        }
        else {
            result = await conn.execute(`SELECT user_id AS userId, name, email from users where email = ? `, [email]);
        }
        return result[0][0];
    }
    catch (error) {
        throw error;
    }
};
export const findUserByUserId = async (reqId, userId) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            result = await conn.query(`SELECT user_id AS userId, name, email from users where user_id = ${userId}`);
        }
        else {
            result = await conn.execute(`SELECT user_id AS userId, name, email from users where user_id = ?`, [userId]);
        }
        return result[0][0];
    }
    catch (error) {
        throw error;
    }
};
export const updateUserById = async (reqId, userId, name, email) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            result = await conn.query(`Update users set name = '${name}', email = '${email}' where user_id = ${userId}`);
        }
        else {
            result = await conn.execute(`Update users set name = ?, email = ? where user_id = ?`, [name, email, userId]);
        }
        return result[0];
    }
    catch (error) {
        throw error;
    }
};
export const createUser = async (reqId, name, email, password) => {
    try {
        const result = await conn.query(`INSERT into users(name,email,password) values('${name}', '${email}', '${password}')`);
        return result;
    }
    catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new ResponseError(409, "email telah terdaftar");
        }
        throw error;
    }
};
export const findAllUsers = async (reqId) => {
    try {
        const result = await conn.execute("SELECT user_id AS userId, name, email FROM users");
        return result[0];
    }
    catch (error) {
        throw error;
    }
};
