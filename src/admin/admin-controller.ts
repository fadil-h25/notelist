import express, { NextFunction, Request, Response } from "express";
import { getReqId, getReqUserId } from "../utils/getReqProps.ts";
import { getAdminById } from "./admin-service.ts";
import { Logger } from "../utils/logger.ts";

export const adminRouter = express.Router();

adminRouter.get(
  "/me",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
    } catch (error) {
      Logger.info("Admin failed fetch admin by ID", {
        reqId: getReqId(req),
        ip: req.ip,
      });
      next(error);
    }
  }
);
