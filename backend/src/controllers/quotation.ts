import { Request, Response } from "express"
import { QuotationService } from "../services/quotation"
import { success } from "../utils/response"
import { AppError } from "../erros/AppError"

const quotationService = new QuotationService()

export class QuotationController {

  async getAll(req: Request, res: Response) {
    const quotations = await quotationService.getAll()

    return success(res, quotations, "Cotações listadas com sucesso")
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params

    const quotation = await quotationService.getById(id)

    if (!quotation) {
      throw new AppError("Cotação não encontrada", 404)
    }

    return success(res, quotation, "Cotação encontrada")
  }

  async create(req: Request, res: Response) {
    const data = req.body

    if (!data.items || data.items.length === 0) {
      throw new AppError("A cotação precisa ter pelo menos 1 item", 400)
    }

    const quotation = await quotationService.create(data)

    return success(res, quotation, "Cotação criada com sucesso", 201)
  }

  async update(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params
    const data = req.body

    const quotation = await quotationService.getById(id)

    if (!quotation) {
      throw new AppError("Cotação não encontrada", 404)
    }

    const updated = await quotationService.update(id, data)

    return success(res, updated, "Cotação atualizada com sucesso")
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params

    const quotation = await quotationService.getById(id)

    if (!quotation) {
      throw new AppError("Cotação não encontrada", 404)
    }

    await quotationService.delete(id)

    return success(res, null, "Cotação deletada com sucesso")
  }
}