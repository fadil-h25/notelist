import { hash } from "bcrypt";
import { ResponseError } from "../utils/response-error.js";
import { createUser, findAllUsers, findUserByEmail, findUserByUserId, findUserDataLogin, updateUserById, } from "./user-repository.js";
import validate from "../utils/validation/validate.js";
import { validationEmail, validationUserId, } from "../utils/validation/validationSchema.js";
import { validateNewUserData, validateUpdateUserData } from "./user-schema.js";
import { Logger } from "../utils/logger.js";
export const getUserByEmail = async (reqId, userId, email) => {
    try {
        Logger.debug("Getting user by email", { reqId, userId, email });
        validate(validationEmail, email);
        const user = await findUserByEmail(reqId, email);
        Logger.debug("Get user by email success", { reqId, userId, email });
        return user;
    }
    catch (error) {
        Logger.error("Error getting user by email", {
            reqId,
            userId,
            email,
            error,
        });
        throw error;
    }
};
export const getUserDataLogin = async (reqId, email) => {
    try {
        Logger.debug("Getting user data for login", { reqId, email });
        validate(validationEmail, email);
        const user = await findUserDataLogin(reqId, email);
        Logger.debug("Get user data for login success", { reqId, email });
        return user;
    }
    catch (error) {
        Logger.error("Error getting user data for login", { reqId, email, error });
        throw error;
    }
};
export const getUserById = async (reqId, userId) => {
    try {
        Logger.debug("Getting user by ID", { reqId, userId });
        validate(validationUserId, userId);
        const user = await findUserByUserId(reqId, userId);
        if (!user)
            throw new ResponseError(404, "User not found");
        Logger.debug("Get user by ID success", { reqId, userId });
        return user;
    }
    catch (error) {
        Logger.error("Error getting user by ID", { reqId, userId, error });
        throw error;
    }
};
export const addNewUser = async (reqId, name, email, password) => {
    try {
        Logger.debug("Adding new user", { reqId, name, email });
        validate(validateNewUserData, { name, email, password });
        const hashedPassword = await hash(password, 10);
        const user = await createUser(reqId, name, email, hashedPassword);
        Logger.debug("Add new user success", { reqId, email });
        return user;
    }
    catch (error) {
        Logger.error("Error adding new user", { reqId, name, email, error });
        throw error;
    }
};
export const getAllUsers = async (reqId, adminId) => {
    try {
        Logger.debug("Getting all users", { reqId, adminId });
        const users = await findAllUsers(reqId);
        Logger.debug("Get all users success", { reqId, adminId });
        return users;
    }
    catch (error) {
        Logger.error("Error getting all users", { reqId, adminId, error });
        throw error;
    }
};
export const editUser = async (reqId, userId, name, email) => {
    try {
        Logger.debug("Editing user", { reqId, userId, name, email });
        validate(validateUpdateUserData, { userId, email, name });
        const user = await updateUserById(reqId, userId, name, email);
        Logger.debug("Edit user success", { reqId, userId });
        return user;
    }
    catch (error) {
        Logger.error("Error editing user", { reqId, userId, name, email, error });
        throw error;
    }
};
