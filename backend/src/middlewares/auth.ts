import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/user";
import { AppError } from "../erros/AppError";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("token nao informado", 401);
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    throw new AppError("token mal informado!", 401);
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    throw new AppError("token mal formatado!", 401);
  }

  if (!token) {
    throw new AppError("token invalido!!", 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError("JWT_SECRET nao configurado!!", 500);
  }

  console.log("🔐 TOKEN RECEBIDO:", token);

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;

    console.log("✅ TOKEN DECODIFICADO:", decoded);

    (req as any).userId = decoded.id;
    (req as any).user = decoded;
    req.userId = decoded.id; 

    const userId = req.userId!;


    return next();
  } catch (error) {
    console.error("❌ ERRO JWT:", error);
    throw new AppError("token invalido!!", 401);
  }
}
