import { validationDescription, validationNoteId, validationTitle, validationUserId, } from "../utils/validation/validationSchema.js";
import { z } from "zod";
export const validateGetNote = z.object({
    userId: validationUserId,
    noteId: validationNoteId,
});
export const validateDeleteNote = z.object({
    userId: validationUserId,
    noteId: validationNoteId,
});
export const validateAddeNote = z.object({
    userId: validationUserId,
    title: validationTitle,
    description: validationDescription,
});
export const validateUpdateNote = z.object({
    userId: validationUserId,
    noteId: validationNoteId,
    title: validationTitle,
    description: validationDescription,
});
