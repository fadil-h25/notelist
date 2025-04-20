import dotenv from "dotenv";
dotenv.config();
import { Strategy } from "passport-jwt";
import { ResponseError } from "../utils/response-error.js";
import { getUserById } from "../users/user-service.js";
import { getAdminById } from "../admin/admin-service.js";
import { getReqId } from "../utils/getReqProps.js";
import { Logger } from "../utils/logger.js"; // pastikan ada
import { error } from "console";
if (!process.env.SECRET_KEY)
    throw error("secret_key not found");
const secretKey = String(process.env.SECRET_KEY);
const extractJwt = (req) => {
    try {
        const token = req.cookies?.["token-note"] || null;
        if (!token) {
            Logger.warn("Token not found", {
                ip: req.ip,
                url: req.originalUrl,
                reqId: getReqId(req),
            });
            return null;
        }
        return token;
    }
    catch {
        return null;
    }
};
export const passportValidateAdminTokenConfig = new Strategy({
    secretOrKey: secretKey,
    jwtFromRequest: extractJwt,
    passReqToCallback: true,
}, async function (req, jwt_payload, done) {
    try {
        const reqId = getReqId(req);
        const targetAdmin = await getAdminById(reqId, jwt_payload.id);
        if (!targetAdmin) {
            Logger.info("Admin token invalid - admin not found", {
                reqId,
                ip: jwt_payload?.ip || "unknown",
                adminId: jwt_payload.id,
            });
            return done(new ResponseError(401, "token is not valid"), false);
        }
        Logger.info("Admin token validated", {
            reqId,
            ip: jwt_payload?.ip || "unknown",
            adminId: jwt_payload.id,
        });
        return done(null, jwt_payload);
    }
    catch (err) {
        const reqId = getReqId(req);
        Logger.error("Admin token validation failed", {
            reqId,
            error: err?.message,
        });
        return done(new ResponseError(500, "internal server error"), false);
    }
});
export const passportValidateTokenConfig = new Strategy({
    secretOrKey: secretKey,
    jwtFromRequest: extractJwt,
    passReqToCallback: true,
}, async function (req, jwt_payload, done) {
    const reqId = getReqId(req) || "n/a";
    const ip = req.ip;
    try {
        const targetUser = await getUserById(reqId, jwt_payload.id);
        if (!targetUser) {
            Logger.warn("User token invalid - user not found", {
                reqId,
                ip,
                userId: jwt_payload.id,
            });
            return done(new ResponseError(401, "token is not valid"), false);
        }
        Logger.info("User token validated", {
            reqId,
            ip,
            userId: jwt_payload.id,
        });
        return done(null, jwt_payload);
    }
    catch (err) {
        Logger.error("User token validation failed", {
            reqId,
            ip,
            error: err?.message,
        });
        return done(new ResponseError(500, "internal server error"), false);
    }
});
