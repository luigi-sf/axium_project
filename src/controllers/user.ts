import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const user = await userService.create(req.body);

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
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }

  async list(req: Request, res: Response) {
    const users = await userService.list();
    return res.json(users);
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }

    const user = await userService.findById(id);
    return res.json(user);
  }

  async update(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }

    const user = await userService.update(id, req.body);
    return res.json(user);
  }

  async remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }

    await userService.delete(id);
    return res.status(204).send();
  }
}
