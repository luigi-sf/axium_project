import { prisma } from "../lib/prisma"
import { Prisma } from "../../generated/prisma" // ajuste o caminho se necessário
import { QuotationDTO } from "../types/quotation"

// include padrão (evita repetição)
const quotationInclude = {
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

export class QuotationService {

  async getAll() {
    return prisma.quotation.findMany({
      include: quotationInclude
    })
  }

  async getById(id: string) {
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: quotationInclude
    })

    if (!quotation) {
      throw new Error("Cotação não encontrada")
    }

    return quotation
  }

  async create(data: QuotationDTO) {

    if (!data.items || data.items.length === 0) {
      throw new Error("A cotação precisa ter pelo menos 1 item")
    }

    return prisma.quotation.create({
      data: {
        supplier: { connect: { id: data.supplierId } },
        user: { connect: { id: data.userId } },
        status: data.status ?? "PENDING",
        items: {
          create: data.items.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: quotationInclude
    })
  }

  async update(id: string, data: Partial<QuotationDTO>) {

    const quotationExists = await prisma.quotation.findUnique({
      where: { id }
    })

    if (!quotationExists) {
      throw new Error("Cotação não encontrada")
    }

    return prisma.quotation.update({
      where: { id },
      data: {
        status: data.status,
        supplier: data.supplierId
          ? { connect: { id: data.supplierId } }
          : undefined,
        items: data.items
          ? {
              deleteMany: {}, // remove todos os antigos
              create: data.items.map(item => ({
                product: { connect: { id: item.productId } },
                quantity: item.quantity,
                price: item.price
              }))
            }
          : undefined
      },
      include: quotationInclude
    })
  }

  async delete(id: string) {

    const quotationExists = await prisma.quotation.findUnique({
      where: { id }
    })

    if (!quotationExists) {
      throw new Error("Cotação não encontrada")
    }

    return prisma.quotation.delete({
      where: { id }
    })
  }
}