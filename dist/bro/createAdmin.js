import { hash } from "bcrypt";

const createAdminPass = async () => {
  const hashPass = await hash("admin123", 10);

  return hashPass;
};

console.log(await createAdminPass());
