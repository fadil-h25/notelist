import { ResponseError } from "../utils/response-error.ts";
import {
  createNote,
  deleteNoteById,
  findManyNotes,
  findNoteById,
  updateNote,
} from "./note-repository.ts";
import { Logger } from "../utils/logger.ts";

export const getAllNotes = async (reqId: string, userId: number) => {
  try {
    Logger.debug("getAllNotes called", { reqId, userId });

    const notes = await findManyNotes(reqId, userId);
    return notes;
  } catch (error) {
    Logger.debug("getAllNotes error", { reqId, userId, error });
    throw error;
  }
};

export const getNoteById = async (
  reqId: string,
  userId: number,
  noteId: number
) => {
  try {
    Logger.debug("getNoteById called", { reqId, userId, noteId });

    const note = await findNoteById(reqId, userId, noteId);
    if (!note) {
      Logger.debug("getNoteById not found", { reqId, userId, noteId });
      throw new ResponseError(404, "resource not found", "note");
    }

    return note;
  } catch (error) {
    Logger.debug("getNoteById error", { reqId, userId, noteId, error });
    throw error;
  }
};

export const addNewNote = async (
  reqId: string,
  userId: number,
  title: string,
  description: string
) => {
  try {
    Logger.debug("addNewNote called", {
      reqId,
      userId,
      title,
    });

    const note = await createNote(reqId, userId, title, description);
    return note;
  } catch (error) {
    Logger.debug("addNewNote error", { reqId, userId, error });
    throw error;
  }
};

export const removeNote = async (
  reqId: string,
  userId: number,
  noteId: number
) => {
  try {
    Logger.debug("removeNote called", { reqId, userId, noteId });

    const result = await deleteNoteById(reqId, userId, noteId);
    if (result.affectedRows < 1) {
      Logger.debug("removeNote not found", { reqId, userId, noteId });
      throw new ResponseError(404, "resource not found", "note");
    }

    return result;
  } catch (error) {
    Logger.debug("removeNote error", { reqId, userId, noteId, error });
    throw error;
  }
};

export const editNote = async (
  reqId: string,
  userId: number,
  noteId: number,
  title: string,
  description: string
) => {
  try {
    Logger.debug("editNote called", {
      reqId,
      userId,
      noteId,
      title,
    });

    const result = await updateNote(reqId, userId, noteId, title, description);
    if (result.affectedRows < 1) {
      Logger.debug("editNote not found", { reqId, userId, noteId });
      throw new ResponseError(404, "resource not found", "note");
    }

    return result;
  } catch (error) {
    Logger.debug("editNote error", { reqId, userId, noteId, error });
    throw error;
  }
};
