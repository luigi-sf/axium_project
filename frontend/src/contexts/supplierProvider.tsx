import { useState, useCallback, type ReactNode } from "react";
import { supplierService } from "../services/supplier";

import type { Supplier, CreateSupplierDTO, UpdateSupplierDTO } from "../types/suppliers/supplier";
import type { SupplierDocument } from "../types/suppliers/supplier_document";

import { SupplierContext } from "./supplierContext"; // 👈 import do contexto separado

export const SupplierProvider = ({ children }: { children: ReactNode }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.list();
      setSuppliers(data ?? []);
    } catch {
      setError("Erro ao carregar fornecedores");
    } finally {
      setLoading(false);
    }
  }, []);

  const getSupplierById = useCallback(async (id: string): Promise<Supplier> => {
    return supplierService.getById(id);
  }, []);

  const createSupplier = useCallback(async (data: CreateSupplierDTO): Promise<Supplier> => {
    const newSupplier = await supplierService.create(data);
    setSuppliers(prev => [...prev, newSupplier]);
    return newSupplier;
  }, []);

  const updateSupplier = useCallback(async (id: string, data: UpdateSupplierDTO): Promise<Supplier> => {
    const updated = await supplierService.update(id, data);
    setSuppliers(prev => prev.map(s => (s.id === id ? updated : s)));
    return updated;
  }, []);

  const deleteSupplier = useCallback(async (id: string): Promise<void> => {
    await supplierService.deleted(id);
    setSuppliers(prev => prev.filter(s => s.id !== id));
  }, []);

  const uploadDocument = useCallback(async (supplierId: string, file: File): Promise<void> => {
    await supplierService.uploadDocument(supplierId, file);
  }, []);

  const listDocuments = useCallback(async (supplierId: string): Promise<SupplierDocument[]> => {
    const data = await supplierService.listDocument(supplierId);
    return Array.isArray(data) ? data : [];
  }, []);

  const deleteDocument = useCallback(async (supplierId: string, documentId: string): Promise<void> => {
    await supplierService.deletedDocument(supplierId, documentId);
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        loading,
        error,
        loadSuppliers,
        getSupplierById,
        createSupplier,
        updateSupplier,
        deleteSupplier,
        uploadDocument,
        listDocuments,
        deleteDocument
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
