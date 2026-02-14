import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma"; 
import { AppError } from "../erros/AppError";

export class SupplierAuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError("Email e senha são obrigatórios", 400);
      }

      const supplier = await prisma.suppliers.findUnique({ where: { email } });
      if (!supplier) {
        throw new AppError("Email ou senha inválidos", 401);
      }

      const passwordMatch = await bcrypt.compare(password, supplier.password);
      if (!passwordMatch) {
        throw new AppError("Email ou senha inválidos", 401);
      }

      const token = jwt.sign(
        {
          id: supplier.id,
          email: supplier.email,
          role: "supplier",
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
