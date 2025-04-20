import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/response-error.ts";
import { getReqId } from "../utils/getReqProps.ts";
import { Logger } from "../utils/logger.ts";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;

  if (user.role !== "admin") {
    Logger.warn("Access denied, admin only", {
      role: user.role,
      ip: req.ip,
      reqId: getReqId(req),
      url: req.originalUrl,
      userId: user.id,
    });
    throw new ResponseError(
      403,
      "Access denied. You do not have permission to access this resource"
    );
  }

  next();
};

export const userOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;

  if (user.role !== "user") {
    Logger.warn("Access denied, user only", {
      role: user.role,
      ip: req.ip,
      reqId: getReqId(req),
      url: req.originalUrl,
      userId: user.id,
    });
    throw new ResponseError(
      403,
      "Access denied. You do not have permission to access this resource"
    );
  }

  next();
};
