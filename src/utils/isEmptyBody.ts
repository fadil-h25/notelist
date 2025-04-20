import { Request } from "express";
import { ResponseError } from "./response-error.ts";

const isEmptyBody = (req: Request): any => {
  if (!req.body) {
    throw new ResponseError(400, "Input is required");
  }
};

export default isEmptyBody;
