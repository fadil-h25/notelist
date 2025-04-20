import { conn } from "../database/mysql2.js";
import { Logger } from "../utils/logger.js";
export const findManyNotes = async (reqId, userId) => {
    try {
        let result;
        if (process.env.SQP_INJECTION == "true") {
            result = await conn.query(`select note_id AS noteId, user_id AS userId, title, description, create_at AS createAt from notes where user_id = ${userId}`);
        }
        else {
            result = await conn.execute(`select note_id AS noteId, user_id AS userId, title, description, create_at AS createAt from notes where user_id = ?`, [userId]);
        }
        Logger.debug("findManyNotes result", { reqId, result });
        return result[0];
    }
    catch (error) {
        Logger.error("findManyNotes error", { reqId, error });
        throw error;
    }
};
export const findNoteById = async (reqId, userId, noteId) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            const sql = `select note_id AS noteId, user_id AS userId, title, description, create_at AS createAt from notes where user_id = ${userId} and note_id = ${noteId}`;
            result = await conn.query(sql);
        }
        else {
            result = await conn.execute(`select note_id AS noteId, user_id AS userId, title, description, create_at AS createAt from notes where user_id = ? and note_id = ?`, [userId, noteId]);
        }
        Logger.debug("findNoteById result", { reqId, result });
        return result[0][0];
    }
    catch (error) {
        Logger.error("findNoteById error", { reqId, error });
        throw error;
    }
};
export const updateNote = async (reqId, userId, noteId, title, description) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            result = await conn.query(`update notes set title = '${title}', description = '${description}' where user_id = ${userId} and note_id = ${noteId}`);
        }
        else {
            result = await conn.query(`update notes set title = ?, description = ? where user_id = ? and note_id = ?`, [title, description, userId, noteId]);
        }
        Logger.debug("updateNote result", { reqId, result });
        return result[0];
    }
    catch (error) {
        Logger.error("updateNote error", { reqId, error });
        throw error;
    }
};
export const deleteNoteById = async (reqId, userId, noteId) => {
    try {
        let result;
        if (process.env.SQL_INJECTION == "true") {
            result = await conn.query(`delete from notes where user_id = ${userId} and note_id = ${noteId}`);
        }
        else {
            result = await conn.execute(`delete from notes where user_id = ? and note_id = ?`, [userId, noteId]);
        }
        Logger.debug("deleteNoteById result", { reqId, result });
        return result[0];
    }
    catch (error) {
        Logger.error("deleteNoteById error", { reqId, error });
        throw error;
    }
};
export const createNote = async (reqId, userId, title, description) => {
    try {
        let result;
        if (process.env.SQP_INJECTION == "true") {
            result = await conn.query(`insert into notes(user_id, title,description) value('${userId}', '${title}', '${description}')`);
        }
        else {
            result = await conn.query(`insert into notes(user_id, title,description) value(?,?,?)`, [userId, title, description]);
        }
        Logger.debug("createNote result", { reqId, result });
        return result[0];
    }
    catch (error) {
        Logger.error("createNote error", { reqId, error });
        throw error;
    }
};
