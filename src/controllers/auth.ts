import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { AppError } from "../erros/AppError";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError("Email e senha são obrigatórios", 400);
      }

      const user = await prisma.users.findUnique({
        where: { email }
      });

      if (!user) {
        throw new AppError("Email ou senha inválidos", 401);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Email ou senha inválidos", 401);
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return res.json({ token });
    } catch (error) {
      next(error); 
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Nome, email e senha são obrigatórios", 400);
    }

    const userExists = await prisma.users.findUnique({
      where: { email }
    });

    if (userExists) {
      throw new AppError("Usuário já existe", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user"
      }
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      token
    });

  } catch (error) {
    next(error);
  }
}
}
