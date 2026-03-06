import { prisma } from "../lib/prisma";
import { CreateUserDTO, UpdateUserDTO } from "../types/user";
import bcrypt from "bcrypt";
import { AppError } from "../erros/AppError";

export class UserService {

  async create(dto: CreateUserDTO) {
    try {

      // verifica se email já existe
      const existingUser = await prisma.users.findUnique({
        where: { email: dto.email }
      });

      if (existingUser) {
        throw new AppError("Email already in use", 409);
      }

      // hash da senha
      const hash = await bcrypt.hash(dto.password, 10);

      return prisma.users.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
          role: dto.role ?? "USER", // se não mandar role vira USER
          active: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          active: true
        }
      });

    } catch (error: any) {

      // erro de unique do prisma
      if (error.code === "P2002") {
        throw new AppError("Email already exists", 409);
      }

      throw error;
    }
  }

  async list() {
    return prisma.users.findMany({
        where:{role:'USER'},
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true
      }
    });
  }

  async findById(id: string) {

    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async findByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email }
    });
  }

  async update(id: string, data: UpdateUserDTO) {

    const user = await prisma.users.findUnique({
      where: { id }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return prisma.users.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true
      }
    });
  }

  async delete(id: string) {

    const user = await prisma.users.findUnique({
      where: { id }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return prisma.users.delete({
      where: { id }
    });
  }
}