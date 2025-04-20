import { getAllUsers, getUserById } from "../users/user-service.ts";
import { findAdminById, findAdminLoginData } from "./admin-repository.ts";

export const getAdminById = async (reqId: string, adminId: number) => {
  try {
    const admin = await findAdminById(adminId);
    return admin;
  } catch (error) {
    throw error;
  }
};

export const getAdminLogin = async (reqId: string, email: string) => {
  try {
    const admin = await findAdminLoginData(email);
    return admin;
  } catch (error) {
    throw error;
  }
};
