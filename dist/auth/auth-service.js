import { addNewUser, getUserDataLogin, } from "../users/user-service.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { ResponseError } from "../utils/response-error.js";
import { getAdminLogin } from "../admin/admin-service.js";
import { Logger } from "../utils/logger.js";
import { maskEmail } from "../utils/maskEmail.js";
export const loginUser = async (reqId, // Mengubah reqId menjadi string
email, password) => {
    try {
        Logger.debug("user login", { email: maskEmail(email), reqId });
        const user = await getUserDataLogin(reqId, email);
        if (!user)
            throw new ResponseError(401, "email atau password salah");
        const compareResult = await compare(password, user.password);
        if (!compareResult)
            throw new ResponseError(401, "email atau password salah");
        const secretKey = String(process.env.SECRET_KEY);
        const token = jwt.sign({
            id: user.userId,
            role: "user",
        }, secretKey, {
            expiresIn: "1h",
        });
        Logger.debug("user login success", {
            email: maskEmail(email),
            reqId,
        });
        return token;
    }
    catch (error) {
        throw error;
    }
};
export const registerUser = async (reqId, // Mengubah reqId menjadi string
name, email, password) => {
    try {
        Logger.debug("user register", { email: maskEmail(email), reqId });
        const user = await addNewUser(reqId, name, email, password);
        Logger.info("user register success", { email: maskEmail(email), reqId });
        return user;
    }
    catch (error) {
        throw error;
    }
};
export const loginAdmin = async (reqId, // Mengubah reqId menjadi string
email, password) => {
    try {
        Logger.debug("user login", { email: maskEmail(email), reqId });
        const admin = await getAdminLogin(reqId, email);
        if (!admin)
            throw new ResponseError(401, "email atau password salah");
        const result = await compare(password, admin.password);
        if (!result)
            throw new ResponseError(401, "email atau password salah");
        const secretKey = String(process.env.SECRET_KEY);
        const token = jwt.sign({
            id: admin.adminId,
            role: "admin",
        }, secretKey, {
            expiresIn: "1h",
        });
        Logger.debug("admin login success", { userId: admin.adminId, reqId });
        return token;
    }
    catch (error) {
        throw error;
    }
};
