import zod from "zod";
const iDNumberMin = "user id is not valid";
export const validationUserId = zod.number().min(1, "user id is not valid");
export const validationNoteId = zod.number().min(1, "note id is not valid");
export const validationEmail = zod.string().email("email is not valid");
export const validationName = zod
    .string()
    .min(1, "name must consist of at least 1 character")
    .max(20, "name must consist of a maximum of 20 characters");
export const validationPassword = zod
    .string()
    .min(1, "name must consist of at least 8 character")
    .max(20, "name must consist of a maximum of 20 characters");
export const validationPasswordLogin = zod.string();
export const validationTitle = zod
    .string()
    .min(1, "title must consist of at least 1 character")
    .max(50, "title must consist of a maximum of 50 characters");
export const validationDescription = zod
    .string()
    .max(200, "description must consist of at least 200 character");
