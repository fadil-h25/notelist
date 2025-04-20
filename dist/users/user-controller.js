import express from "express";
import { getAllUsers, getUserById, editUser } from "../users/user-service.js";
import { adminOnly, userOnly } from "../middlewares/outh-middleware.js";
import { stringToNumber } from "../utils/tranform.js";
import validate from "../utils/validation/validate.js";
import { validateUpdateUserData } from "./user-schema.js";
import { getReqId } from "../utils/getReqProps.js";
import { Logger } from "../utils/logger.js";
export const userRouter = express.Router();
userRouter.get("", adminOnly, async function (req, res, next) {
    const reqId = getReqId(req); // Mengubah reqId menjadi tipe string
    try {
        const adminId = req.admin.id;
        Logger.info("Admin fetch all users", {
            reqId,
            ip: req.ip,
            adminId,
        });
        const users = await getAllUsers(reqId, adminId);
        return res.status(200).json({ data: users });
    }
    catch (error) {
        Logger.error("Admin failed to fetch users", {
            reqId,
            ip: req.ip,
        });
        next(error);
    }
});
userRouter.get("/me", userOnly, async function (req, res, next) {
    const reqId = getReqId(req); // Mengubah reqId menjadi tipe string
    try {
        const userId = stringToNumber(req.user.id, "userId");
        Logger.info("User fetch profile", {
            reqId,
            ip: req.ip,
            userId,
        });
        const user = await getUserById(reqId, userId);
        return res.status(200).json({ data: user });
    }
    catch (error) {
        Logger.error("User failed to fetch profile", {
            reqId,
            ip: req.ip,
        });
        next(error);
    }
});
userRouter.patch("/me", userOnly, async function (req, res, next) {
    const reqId = getReqId(req); // Mengubah reqId menjadi tipe string
    try {
        const userId = stringToNumber(req.user.id, "userId");
        const { name, email } = validate(validateUpdateUserData, {
            userId,
            ...req.body,
        });
        await editUser(reqId, userId, name, email);
        Logger.info("User updated profile", {
            reqId,
            ip: req.ip,
            userId,
        });
        return res.sendStatus(204);
    }
    catch (error) {
        Logger.warn("User failed to update profile", {
            reqId,
            ip: req.ip,
        });
        next(error);
    }
});
userRouter.get("/:userId", adminOnly, async function (req, res, next) {
    const reqId = getReqId(req);
    try {
        const userId = stringToNumber(req.params.userId, "userId");
        Logger.info("Admin fetch user by ID", {
            reqId,
            ip: req.ip,
            userId,
        });
        const user = await getUserById(reqId, userId);
        return res.status(200).json({ data: user });
    }
    catch (error) {
        Logger.error("Admin failed to fetch user by ID", {
            reqId,
            ip: req.ip,
        });
        next(error);
    }
});
