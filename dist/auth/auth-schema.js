import { validationEmail, validationName, validationPassword, validationPasswordLogin, } from "../utils/validation/validationSchema.js";
import { z } from "zod";
export const validateRegisterUser = z.object({
    name: validationName,
    email: validationEmail,
    password: validationPassword,
});
export const validateLogin = z.object({
    email: validationEmail,
    password: validationPasswordLogin,
});
