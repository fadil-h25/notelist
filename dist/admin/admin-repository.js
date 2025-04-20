import { conn } from "../database/mysql2.js";
export const findAdminLoginData = async (email) => {
    console.log("admin yang ingin dicari: ", email);
    try {
        const admin = await conn.execute("select admin_id as adminId, password from admins where email = ?", [email]);
        return admin[0][0];
    }
    catch (error) {
        throw error;
    }
};
export const findAdminById = async (adminId) => {
    try {
        const admin = await conn.execute("select admin_id as adminId, password from admins where admin_id = ?", [adminId]);
        return admin[0][0];
    }
    catch (error) {
        throw error;
    }
};
