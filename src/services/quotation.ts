import {prisma} from "../lib/prisma"; // seu client do Prisma

export class QuotationService {
  async getAll() {
    return prisma.quotation.findMany({
      include: {
  supplier: {
    select: {
      id: true,
      companyName: true,
      tradingName: true,
      email: true,
      phone: true
    }
  },
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  },
  items: {
    include: {
      product: true
    }
  }
}
    });
  }

  async getById(id: string) {
    return prisma.quotation.findUnique({
      where: { id },
      include: {
  supplier: {
    select: {
      id: true,
      companyName: true,
      tradingName: true,
      email: true,
      phone: true
    }
  },
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  },
  items: {
    include: {
      product: true
    }
  }
}
    });
  }

  async create(data: QuotationDTO) {
    return prisma.quotation.create({
      data: {
        supplier: { connect: { id: data.supplierId } },
        user: { connect: { id: data.userId } },
        status: data.status || "PENDING",
        items: {
          create: data.items.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
  supplier: {
    select: {
      id: true,
      companyName: true,
      tradingName: true,
      email: true,
      phone: true
    }
  },
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  },
  items: {
    include: {
      product: true
    }
  }
}
    });
  }

  async update(id: string, data: Partial<QuotationDTO>) {
    // Atualiza status e supplier, se fornecido
    return prisma.quotation.update({
      where: { id },
      data: {
        status: data.status,
        supplier: data.supplierId ? { connect: { id: data.supplierId } } : undefined,
        items: data.items
          ? {
              deleteMany: {}, // remove itens antigos
              create: data.items.map((item) => ({
                product: { connect: { id: item.productId } },
                quantity: item.quantity,
                price: item.price,
              })),
            }
          : undefined,
      },
      include: {
  supplier: {
    select: {
      id: true,
      companyName: true,
      tradingName: true,
      email: true,
      phone: true
    }
  },
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  },
  items: {
    include: {
      product: true
    }
  }
}
    });
  }

  async delete(id: string) {
    return prisma.quotation.delete({
      where: { id },
    });
  }
}
