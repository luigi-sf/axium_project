import { prisma } from "../lib/prisma";
import { AppError } from "../erros/AppError";
import { CreateSupplierDTO, UpdateSupplierDTO } from "../types/supplier";
import { enum_Users_role } from "../../generated/prisma";

export class SupplierService {

  // 🔹 Criar perfil de supplier
  async create(data: CreateSupplierDTO) {

    const user = await prisma.users.findUnique({
      where: { id: data.userId }
    });

    if (!user)
      throw new AppError("Usuário não encontrado", 404);

    const alreadyExists = await prisma.suppliers.findUnique({
      where: { userId: data.userId }
    });

    if (alreadyExists)
      throw new AppError("Usuário já possui perfil de fornecedor", 400);

    const supplier = await prisma.$transaction(async (tx) => {

      const created = await tx.suppliers.create({
        data
      });

      await tx.users.update({
        where: { id: data.userId },
        data: { role: "SUPPLIER" }
      });

      return created;
    });

    return supplier;
  }

  // 🔹 Buscar por ID
  async getById(id: string) {

    const supplier = await prisma.suppliers.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!supplier)
      throw new AppError("Perfil de fornecedor não encontrado", 404);

    return supplier;
  }

  // 🔹 Listar todos
  async getAll() {
    return prisma.suppliers.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
  }

  // 🔹 Atualizar
 async update(id: string, data: UpdateSupplierDTO) {

  const supplier = await prisma.suppliers.findUnique({
    where: { id }
  });

  if (!supplier) {
    throw new AppError("Perfil de fornecedor não encontrado", 404);
  }

  const {
    id: _id,
    createdAt,
    updatedAt,
    userId,
    user,
    createdBy,
    updatedBy,
    ...cleanData
  } = data as any;

  return prisma.suppliers.update({
    where: { id },
    data: cleanData
  });
}

  // 🔹 Deletar
  async delete(id: string) {

    const supplier = await prisma.suppliers.findUnique({
      where: { id }
    });

    if (!supplier)
      throw new AppError("Perfil de fornecedor não encontrado", 404);

    return prisma.$transaction(async (tx) => {

      const deleted = await tx.suppliers.delete({
        where: { id }
      });

      // opcional: voltar role para USER
      await tx.users.update({
        where: { id: supplier.userId },
        data: { role: "USER" }
      });

      return deleted;
    });
  }

  // 🔹 Buscar pelo userId
  async findByUserId(userId: string) {

    const supplier = await prisma.suppliers.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!supplier)
      throw new AppError("Perfil de fornecedor não encontrado", 404);

    return supplier;
  }
}