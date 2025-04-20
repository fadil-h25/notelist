import { ResponseError } from "../utils/response-error.js";
import { getReqId } from "../utils/getReqProps.js";
import { Logger } from "../utils/logger.js";
export const adminOnly = (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
        Logger.warn("Access denied, admin only", {
            role: user.role,
            ip: req.ip,
            reqId: getReqId(req),
            url: req.originalUrl,
            userId: user.id,
        });
        throw new ResponseError(403, "Access denied. You do not have permission to access this resource");
    }
    next();
};
export const userOnly = (req, res, next) => {
    const user = req.user;
    if (user.role !== "user") {
        Logger.warn("Access denied, user only", {
            role: user.role,
            ip: req.ip,
            reqId: getReqId(req),
            url: req.originalUrl,
            userId: user.id,
        });
        throw new ResponseError(403, "Access denied. You do not have permission to access this resource");
    }
    next();
};
