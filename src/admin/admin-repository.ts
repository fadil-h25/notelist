import { conn } from "../database/mysql2.ts";

export const findAdminLoginData = async (email: string) => {
  console.log("admin yang ingin dicari: ", email);

  try {
    const admin = await conn.execute(
      "select admin_id as adminId, password from admins where email = ?",
      [email]
    );

    return (admin as any)[0][0];
  } catch (error) {
    throw error;
  }
};

export const findAdminById = async (adminId: number) => {
  try {
    const admin = await conn.execute(
      "select admin_id as adminId, password from admins where admin_id = ?",
      [adminId]
    );
    return (admin as any)[0][0];
  } catch (error) {
    throw error;
  }
};
