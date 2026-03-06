import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { AppError } from "../erros/AppError";
import { success } from "../utils/response";
import { enum_Users_role } from "../../generated/prisma";

export class AuthController {

  private generateToken(user: {
    id: string;
    email: string;
    role: enum_Users_role;
    supplierProfileId?: string | null;
  }) {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não está definido!");
      throw new Error("JWT_SECRET is not defined");
    }

    return Jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        supplierProfileId: user.supplierProfileId ?? null
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Login chamado");
      console.log("BODY RECEBIDO:", req.body);

      const { email, password } = req.body;

      if (!email || !password) {
        console.error("Faltando email ou password");
        throw new AppError("Invalid email or password", 400);
      }

      const user = await prisma.users.findUnique({
        where: { email },
        include: { supplierProfile: true }
      });

      if (!user) {
        console.error("Usuário não encontrado para email:", email);
        throw new AppError("Invalid email or password", 401);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.error("Senha incorreta para email:", email);
        throw new AppError("Invalid email or password", 401);
      }

      console.log("Usuário autenticado:", user.email);

      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        supplierProfileId: user.supplierProfile?.id ?? null
      });

      console.log("Token gerado:", token);

      return success(
        res,
        {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            supplierProfile: user.supplierProfile
              ? { id: user.supplierProfile.id }
              : null
          }
        },
        "User logged in successfully",
        200
      );

    } catch (err) {
      console.error("ERRO NO LOGIN:", err);
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Register chamado");
      console.log("BODY RECEBIDO:", req.body);

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        console.error("Campos obrigatórios faltando");
        throw new AppError("Name, email and password are required", 400);
      }

      const userExists = await prisma.users.findUnique({
        where: { email }
      });

      if (userExists) {
        console.error("Usuário já existe:", email);
        throw new AppError("User already exists", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Senha criptografada");

      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: enum_Users_role.USER
        },
        include: { supplierProfile: true }
      });

      console.log("Usuário criado:", user.email);

      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        supplierProfileId: null
      });

      console.log("Token gerado:", token);

      return success(
        res,
        {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            supplierProfile: null
          }
        },
        "User registered successfully",
        201
      );

    } catch (err) {
      console.error("ERRO NO REGISTER:", err);
      next(err);
    }
  }
}