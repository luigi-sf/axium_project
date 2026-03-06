import { Request, Response, NextFunction } from "express";
import { AppError } from "../erros/AppError";
import { enum_Users_role } from "../../generated/prisma";

export const authorize = (roles: enum_Users_role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!req.user)
      throw new AppError("Usuário não autenticado", 401);

    if (!roles.includes(req.user.role))
      throw new AppError("Sem permissão", 403);

    next();
  };
};