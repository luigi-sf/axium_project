import { Request, Response, NextFunction } from "express";
import { SupplierService } from "../services/supplier";
import { CreateSupplierDTO, UpdateSupplierDTO } from "../types/supplier";
import { success } from "../utils/response";
import { AppError } from "../erros/AppError";

const supplierService = new SupplierService();

export class SupplierController {

  // 🔹 Criar perfil de fornecedor
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("SupplierController.create chamado");
      console.log("BODY RECEBIDO:", req.body);

      if (!req.user) {
        console.error("Usuário não autenticado");
        throw new AppError("Usuário não autenticado", 401);
      }

      const data: CreateSupplierDTO = {
        ...req.body,
        userId: req.user.id
      };

      console.log("Dados do supplier a serem criados:", data);

      const supplier = await supplierService.create(data);

      console.log("Supplier criado:", supplier);

      return success(res, supplier, "Fornecedor criado com sucesso", 201);
    } catch (error) {
      console.error("ERRO NO create:", error);
      next(error);
    }
  }

  // 🔹 Listar fornecedores
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("SupplierController.list chamado");

      if (!req.user) {
        console.error("Usuário não autenticado");
        throw new AppError("Usuário não autenticado", 401);
      }

      const suppliers = await supplierService.getAll();

      console.log("Suppliers encontrados:", suppliers.length);

      return success(res, suppliers, "Fornecedores listados com sucesso");
    } catch (error) {
      console.error("ERRO NO list:", error);
      next(error);
    }
  }

  // 🔹 Buscar por ID
  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log("SupplierController.getById chamado com id:", id);

      const supplier = await supplierService.getById(id);

      console.log("Supplier encontrado:", supplier);

      return success(res, supplier, "Fornecedor encontrado");
    } catch (error) {
      console.error("ERRO NO getById:", error);
      next(error);
    }
  }

  // 🔹 Atualizar
  async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const { id } = req.params;
    const data: UpdateSupplierDTO = req.body;

    console.log("SupplierController.update chamado com id:", id);
    console.log("Dados a atualizar:", data);

    const supplier = await supplierService.getById(id);

    if (!supplier) {
      throw new AppError("Fornecedor não encontrado", 404);
    }

    const updated = await supplierService.update(id, data);

    console.log("Supplier atualizado:", updated);

    return success(res, updated, "Fornecedor atualizado com sucesso");
  } catch (error) {
    console.error("ERRO NO update:", error);
    next(error);
  }
}

  // 🔹 Remover
  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log("SupplierController.remove chamado com id:", id);

      await supplierService.delete(id);

      console.log("Supplier removido:", id);

      return res.status(204).send();
    } catch (error) {
      console.error("ERRO NO remove:", error);
      next(error);
    }
  }
}