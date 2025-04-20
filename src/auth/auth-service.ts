import {
  addNewUser,
  getUserByEmail,
  getUserDataLogin,
} from "../users/user-service.ts";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { ResponseError } from "../utils/response-error.ts";

import { getAdminLogin } from "../admin/admin-service.ts";
import { Logger } from "../utils/logger.ts";
import { maskEmail } from "../utils/maskEmail.ts";

export const loginUser = async (
  reqId: string, // Mengubah reqId menjadi string
  email: string,
  password: string
) => {
  try {
    Logger.debug("user login", { email: maskEmail(email), reqId });
    const user = await getUserDataLogin(reqId, email);

    if (!user) throw new ResponseError(401, "email atau password salah");
    const compareResult = await compare(password, user.password);

    if (!compareResult)
      throw new ResponseError(401, "email atau password salah");

    const secretKey: string = String(process.env.SECRET_KEY);

    const token = jwt.sign(
      {
        id: (user as any).userId,
        role: "user",
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    Logger.debug("user login success", {
      email: maskEmail(email),
      reqId,
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  reqId: string, // Mengubah reqId menjadi string
  name: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    Logger.debug("user register", { email: maskEmail(email), reqId });
    const user = await addNewUser(reqId, name, email, password);

    Logger.info("user register success", { email: maskEmail(email), reqId });
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginAdmin = async (
  reqId: string, // Mengubah reqId menjadi string
  email: string,
  password: string
) => {
  try {
    Logger.debug("user login", { email: maskEmail(email), reqId });
    const admin = await getAdminLogin(reqId, email);

    if (!admin) throw new ResponseError(401, "email atau password salah");

    const result = await compare(password, admin.password);

    if (!result) throw new ResponseError(401, "email atau password salah");

    const secretKey: string = String(process.env.SECRET_KEY);

    const token = jwt.sign(
      {
        id: (admin as any).adminId,
        role: "admin",
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    Logger.debug("admin login success", { userId: admin.adminId, reqId });

    return token;
  } catch (error) {
    throw error;
  }
};
