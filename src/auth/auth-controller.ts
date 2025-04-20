import express, { NextFunction, Request, Response } from "express";
import { loginAdmin, loginUser, registerUser } from "./auth-service.ts";
import isEmptyBody from "../utils/isEmptyBody.ts";
import { getAdminLogin } from "../admin/admin-service.ts";
import validate from "../utils/validation/validate.ts";
import { validateLogin, validateRegisterUser } from "./auth-schema.ts";
import { getReqId } from "../utils/getReqProps.ts";
import { Logger } from "../utils/logger.ts";
import { maskEmail } from "../utils/maskEmail.ts";

export const authRouter = express.Router();

authRouter.post(
  "/admin/login",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const reqId = getReqId(req);
    try {
      Logger.info("Admin login attempt", {
        reqId,
        ip: req.ip,
      });

      const { email, password } = validate(validateLogin, req.body || {});
      const token = await loginAdmin(reqId, email, password);

      res.cookie("token-note", token, {
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
        httpOnly: true,
        path: "/private",
      });

      Logger.info("Admin login successful", {
        reqId,
        ip: req.ip,
        email: maskEmail(email),
      });

      return res.status(200).json({ message: "Berhasil login" });
    } catch (error) {
      Logger.info("Admin login failed", {
        reqId,
        ip: req.ip,
        errors: error,
      });
      next(error);
    }
  }
);

authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const reqId = getReqId(req);
    try {
      Logger.info("User register attempt", {
        reqId,
        ip: req.ip,
      });

      const { name, email, password } = validate(
        validateRegisterUser,
        req.body || {}
      );
      const user = await registerUser(reqId, name, email, password);

      Logger.info("User register successful", {
        reqId,
        ip: req.ip,
        email: maskEmail(email),
      });

      return res.sendStatus(201);
    } catch (error) {
      Logger.info("User register failed", {
        reqId,
        ip: req.ip,
        errors: error,
      });
      next(error);
    }
  }
);

authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const reqId = getReqId(req);
    try {
      Logger.info("User login attempt", {
        reqId,
        ip: req.ip,
      });

      const { email, password } = validate(validateLogin, req.body || {});
      const token = await loginUser(reqId, email, password);

      res.cookie("token-note", token, {
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
        httpOnly: true,
        path: "/private",
      });

      Logger.info("User login successful", {
        reqId,
        ip: req.ip,
        email: maskEmail(email),
      });

      return res.status(200).json({ message: "Berhasil login" });
    } catch (error) {
      Logger.info("User login failed", {
        reqId,
        ip: req.ip,
        errors: error,
      });
      next(error);
    }
  }
);
