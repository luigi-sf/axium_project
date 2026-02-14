import type {
  Supplier,
  CreateSupplierDTO,
  UpdateSupplierDTO
} from './supplier'

import type { SupplierDocument } from "./supplier_document"

export type SupplierContextData = {
  suppliers: Supplier[]
  loading: boolean
  error: string | null

  loadSuppliers: () => Promise<void>
  getSupplierById: (id: string) => Promise<Supplier>

  createSupplier: (
    data: CreateSupplierDTO
  ) => Promise<Supplier>

  updateSupplier: (
    id: string,
    data: UpdateSupplierDTO
  ) => Promise<Supplier>

  deleteSupplier: (id: string) => Promise<void>

  uploadDocument: (
    supplierId: string,
    file: File
  ) => Promise<void>

  listDocuments: (
    supplierId: string
  ) => Promise<SupplierDocument[]>

  deleteDocument: (
    supplierId: string,
    documentId: string
  ) => Promise<void>
}
