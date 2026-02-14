import { Request, Response } from "express";
import { SupplierService } from "../services/supplier";
import { CreateSupplierDTO, UpdateSupplierDTO } from "../types/supplier";
import { success } from "../utils/response";

const supplierService = new SupplierService();

export class SupplierController {

  async create(req: Request, res: Response) {
    const data: CreateSupplierDTO = req.body;
    const userId = (req as any).user.id;

    const supplier = await supplierService.create(data, userId);

    return success(res, supplier, "Fornecedor criado com sucesso", 201);
  }

  async list(req: Request, res: Response) {
  const user = (req as any).user;

  const suppliers = await supplierService.findAll(user.id, user.role);

  return success(res, suppliers, "Fornecedores listados com sucesso");
}


  async getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const supplier = await supplierService.findById(id, userId);

    return success(res, supplier, "Fornecedor encontrado");
  }

  async update(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const data: UpdateSupplierDTO = req.body;

    const supplier = await supplierService.update(id, data, userId);

    return success(res, supplier, "Fornecedor atualizado com sucesso");
  }

  async remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = (req as any).user.id;

    await supplierService.delete(id, userId);

    return res.status(204).send();
  }
}
