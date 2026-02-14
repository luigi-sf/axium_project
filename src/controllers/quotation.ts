import { Request, Response } from "express";
import { QuotationService } from "../services/quotation";

const quotationService = new QuotationService();

export class QuotationController {
  async list(req: Request, res: Response) {
    try {
      const quotations = await quotationService.getAll();
      return res.json({ data: quotations });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar cotações" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const quotation = await quotationService.getById(id);
      return res.json({ data: quotation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar cotação" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { supplierId, items, status } = req.body;
      const userId = (req as any).user.id;

      const quotation = await quotationService.create({ supplierId, items, status, userId });
      return res.status(201).json({ data: quotation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar cotação" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { supplierId, items, status } = req.body;

      const quotation = await quotationService.update(id, { supplierId, items, status });
      return res.json({ data: quotation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar cotação" });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await quotationService.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar cotação" });
    }
  }
}
