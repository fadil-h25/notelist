import express, { NextFunction, Request, Response } from "express";
import {
  addNewNote,
  editNote,
  getAllNotes,
  getNoteById,
  removeNote,
} from "./note-service.ts";
import validate from "../utils/validation/validate.ts";
import {
  validateAddeNote,
  validateDeleteNote,
  validateGetNote,
  validateUpdateNote,
} from "./note-schema.ts";
import { stringToNumber } from "../utils/tranform.ts";
import { validationUserId } from "../utils/validation/validationSchema.ts";
import { getReqId } from "../utils/getReqProps.ts";
import { Logger } from "../utils/logger.ts";

export const noteRouter = express.Router();

noteRouter.get(
  "/notes/:noteId",
  async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const reqId = getReqId(req);
    const url = req.originalUrl;

    try {
      const userId = stringToNumber((req as any).user.id, "userId");
      const noteId = stringToNumber(req.params.noteId, "noteId");

      validate(validateGetNote, { userId, noteId });

      Logger.debug("User fetch note by ID", {
        reqId,
        ip: req.ip,
        url,
        userId,
        noteId,
      });

      const note = await getNoteById(reqId, userId, noteId);

      return res.status(200).json({ data: note });
    } catch (error) {
      Logger.debug("User failed to fetch note by ID", {
        reqId,
        ip: req.ip,
        url,
      });
      next(error);
    }
  }
);

noteRouter.get(
  "/notes",
  async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const reqId = getReqId(req);
    const url = req.originalUrl;

    try {
      const userId = stringToNumber((req as any).user.id, "userId");

      validate(validationUserId, userId);

      Logger.debug("User fetch all notes", {
        reqId,
        ip: req.ip,
        url,
        userId,
      });

      const notes = await getAllNotes(reqId, userId);

      return res.status(200).json({ data: notes });
    } catch (error) {
      Logger.debug("User failed to fetch all notes", {
        reqId,
        ip: req.ip,
        url,
      });
      next(error);
    }
  }
);

noteRouter.delete(
  "/notes/:noteId",
  async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const reqId = getReqId(req);
    const url = req.originalUrl;

    try {
      const userId = stringToNumber((req as any).user.id, "userId");
      const noteId = stringToNumber(req.params.noteId, "noteId");

      validate(validateDeleteNote, { userId, noteId });

      await removeNote(reqId, userId, noteId);

      Logger.debug("User deleted note", {
        reqId,
        ip: req.ip,
        url,
        userId,
        noteId,
      });

      return res.sendStatus(204);
    } catch (error) {
      Logger.debug("User failed to delete note", {
        reqId,
        ip: req.ip,
        url,
      });
      next(error);
    }
  }
);

noteRouter.post(
  "/notes",
  async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const reqId = getReqId(req);
    const url = req.originalUrl;

    try {
      const userId = stringToNumber((req as any).user.id, "userId");

      const { title, description } = validate(validateAddeNote, {
        ...req.body,
        userId,
      });

      const notes = await addNewNote(reqId, userId, title, description);

      Logger.debug("User created new note", {
        reqId,
        ip: req.ip,
        url,
        userId,
        title,
      });

      return res.status(200).json({ data: notes });
    } catch (error) {
      Logger.debug("User failed to create note", {
        reqId,
        ip: req.ip,
        url,
      });
      next(error);
    }
  }
);

noteRouter.patch(
  "/notes/:noteId",
  async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const reqId = getReqId(req);
    const url = req.originalUrl;

    try {
      const userId = stringToNumber((req as any).user.id, "userId");
      const noteId = stringToNumber(req.params.noteId, "noteId");

      const { title, description } = validate(validateUpdateNote, {
        ...req.body,
        userId,
        noteId,
      });

      await editNote(reqId, userId, noteId, title, description);

      Logger.debug("User updated note", {
        reqId,
        ip: req.ip,
        url,
        userId,
        noteId,
      });

      return res.sendStatus(204);
    } catch (error) {
      Logger.debug("User failed to update note", {
        reqId,
        ip: req.ip,
        url,
      });
      next(error);
    }
  }
);
