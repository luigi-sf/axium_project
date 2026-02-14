import { prisma } from "../lib/prisma";
import { CreateSupplierDTO, UpdateSupplierDTO } from "../types/supplier";
import { AppError } from "../erros/AppError";
import bcrypt from "bcryptjs";

export class SupplierService {

  async create(data: CreateSupplierDTO, userId: string) {

    const supplierExists = await prisma.suppliers.findUnique({
      where: { cnpj: data.cnpj },
    });

    if (supplierExists) {
      throw new AppError("Fornecedor com esse CNPJ já existe", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const supplier = await prisma.suppliers.create({
      data: {
        ...data,
        password: hashedPassword,
        createdBy: userId
      },
    });

    const { password, ...supplierWithoutPassword } = supplier;
    return supplierWithoutPassword;
  }

  async findAll(userId: string, role: string) {

  if (role === "admin") {
    return prisma.suppliers.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.suppliers.findMany({
    where: { createdBy: userId },
    orderBy: { createdAt: "desc" },
  });
}

  async findById(id: string, userId: string) {
    const supplier = await prisma.suppliers.findFirst({
      where: {
        id,
        createdBy: userId
      },
    });

    if (!supplier) {
      throw new AppError("Fornecedor não encontrado", 404);
    }

    const { password, ...supplierWithoutPassword } = supplier;
    return supplierWithoutPassword;
  }

  async update(id: string, data: UpdateSupplierDTO, userId: string) {

    const supplier = await prisma.suppliers.findFirst({
      where: {
        id,
        createdBy: userId
      },
    });

    if (!supplier) {
      throw new AppError("Fornecedor não encontrado", 404);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await prisma.suppliers.update({
      where: { id },
      data: {
        ...data,
        updatedBy: userId
      },
    });

    const { password, ...supplierWithoutPassword } = updated;
    return supplierWithoutPassword;
  }

  async delete(id: string, userId: string) {

    const supplier = await prisma.suppliers.findFirst({
      where: {
        id,
        createdBy: userId
      },
    });

    if (!supplier) {
      throw new AppError("Fornecedor não encontrado", 404);
    }

    await prisma.suppliers.delete({
      where: { id },
    });
  }
}
