import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user";
import { AppError } from "../erros/AppError";

const userService = new UserService();

export class UserController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {

      console.log("BODY RECEBIDO:", req.body);

      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        throw new AppError("Missing required fields", 400);
      }

      const user = await userService.create({
        name,
        email,
        password,
        role
      });

      console.log("USER CRIADO:", user);

      if (!process.env.JWT_SECRET) {
        throw new AppError("JWT_SECRET not configured", 500);
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          token,
          user
        }
      });

    } catch (error) {
      console.error("ERRO NO CONTROLLER:", error);
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {

      console.log("LIST USERS");

      const users = await userService.list();

      return res.status(200).json({
        success: true,
        data: users
      });

    } catch (error) {
      console.error("ERRO AO LISTAR USERS:", error);
      next(error);
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      console.log("BUSCANDO USER:", id);

      if (!id) {
        throw new AppError("ID not provided", 400);
      }

      const user = await userService.findById(id);

      return res.status(200).json({
        success: true,
        data: user
      });

    } catch (error) {
      console.error("ERRO AO BUSCAR USER:", error);
      next(error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      console.log("ATUALIZANDO USER:", id);
      console.log("DADOS:", req.body);

      if (!id) {
        throw new AppError("ID not provided", 400);
      }

      const user = await userService.update(id, req.body);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
      });

    } catch (error) {
      console.error("ERRO AO ATUALIZAR USER:", error);
      next(error);
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      console.log("REMOVENDO USER:", id);

      if (!id) {
        throw new AppError("ID not provided", 400);
      }

      await userService.delete(id);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });

    } catch (error) {
      console.error("ERRO AO REMOVER USER:", error);
      next(error);
    }
  }
}