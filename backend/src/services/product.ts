import {prisma} from "../lib/prisma"; // seu client do Prisma

export class ProductService {
  async getAll() {
    return prisma.product.findMany({
      include: {
        user: true,
        quotationItems: true,
      },
    });
  }

  async getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        user: true,
        quotationItems: true,
      },
    });
  }

  async create(data: ProductDTO) {
    
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        user: { connect: { id: data.userId } },
      },
    });
  }

  async update(id: string, data: Partial<ProductDTO>) {
    return prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
