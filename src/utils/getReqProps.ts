import { Request } from "express";

export const getReqId = (req: Request): string => {
  return (req as any).id;
};
export const getReqUserId = (req: Request): number => {
  return (req as any).user.id;
};
