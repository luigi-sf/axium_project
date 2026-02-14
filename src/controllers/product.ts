import { Request, Response } from "express";
import { ProductService } from "../services/product";

const productService = new ProductService();

export class ProductController {
  async list(req: Request, res: Response) {
    try {
      const products = await productService.getAll();
      return res.json({ data: products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const product = await productService.getById(id);
      return res.json({ data: product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const userId = (req as any).user.id; // assumindo que authMiddleware adiciona o user

      const product = await productService.create({ name, description, price, userId });
      return res.status(201).json({ data: product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { name, description, price } = req.body;

      const product = await productService.update(id, { name, description, price });
      return res.json({ data: product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await productService.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  }
}
