import express from "express";
import { getReqId, getReqUserId } from "../utils/getReqProps.js";
import { getAdminById } from "./admin-service.js";
import { Logger } from "../utils/logger.js";
export const adminRouter = express.Router();
adminRouter.get("/me", async (req, res, next) => {
    try {
        const adminId = getReqUserId(req);
        const admin = getAdminById(getReqId(req), adminId);
        Logger.info("Admin fetch admin by ID", {
            reqId: getReqId(req),
            ip: req.ip,
            adminId,
        });
        return res.status(200).json({
            data: admin,
        });
    }
    catch (error) {
        Logger.info("Admin failed fetch admin by ID", {
            reqId: getReqId(req),
            ip: req.ip,
        });
        next(error);
    }
});
