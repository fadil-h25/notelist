import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/response-error.ts";
import { z, ZodError } from "zod";
import { Logger } from "../utils/logger.ts";

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (err instanceof ResponseError) {
    if (
      err.statusCode == 400 ||
      err.statusCode == 409 ||
      err.statusCode == 404
    ) {
      return res.status(err.statusCode).json({
        errors: {
          path: err.path,
          message: err.message,
        },
      });
    }

    return res.status(err.statusCode).json({
      message: err.message,
    });
  } else if (err instanceof z.ZodError) {
    let errors = err.errors.map((error) => {
      return {
        field: error.path[0],
        message: error.message,
      };
    });

    return res.status(400).json({
      errors,
    });
  } else if (err instanceof SyntaxError) {
    return res.status(400).json({
      errors: [
        {
          path: "",
          message: "data is not valid JSON",
        },
      ],
    });
  } else {
    Logger.error("unexcepted error ", { errors: err });

    return res.sendStatus(500);
  }
};
