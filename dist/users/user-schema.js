import { validationEmail, validationName, validationPassword, validationUserId, } from "../utils/validation/validationSchema.js";
import { z } from "zod";
export const validateNewUserData = z.object({
    name: validationName,
    email: validationEmail,
    password: validationPassword,
});
export const validateUpdateUserData = z.object({
    userId: validationUserId,
    name: validationName,
    email: validationEmail,
});
