import { findAdminById, findAdminLoginData } from "./admin-repository.js";
export const getAdminById = async (reqId, adminId) => {
    try {
        const admin = await findAdminById(adminId);
        return admin;
    }
    catch (error) {
        throw error;
    }
};
export const getAdminLogin = async (reqId, email) => {
    try {
        const admin = await findAdminLoginData(email);
        return admin;
    }
    catch (error) {
        throw error;
    }
};
