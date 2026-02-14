import api from './api'
import type { Supplier, CreateSupplierDTO, UpdateSupplierDTO } from '../types/suppliers/supplier'
import type { SupplierDocument } from '../types/suppliers/supplier_document'

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const supplierService = {
  async list(): Promise<Supplier[]> {
    const response = await api.get<ApiResponse<Supplier[]>>('/api/v1/suppliers')
    return response.data.data
  },

  async getById(id: string): Promise<Supplier> {
    const response = await api.get<ApiResponse<Supplier>>(`/api/v1/suppliers/${id}`)
    return response.data.data
  },

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const response = await api.post<ApiResponse<Supplier>>('/api/v1/suppliers', data)
    return response.data.data
  },

  async update(id: string, data: UpdateSupplierDTO): Promise<Supplier> {
    const response = await api.put<ApiResponse<Supplier>>(`/api/v1/suppliers/${id}`, data)
    return response.data.data
  },

  async deleted(id: string): Promise<void> {
    await api.delete(`/api/v1/suppliers/${id}`)
  },

  async uploadDocument(id: string, file: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', file)
    await api.post(`/api/v1/suppliers/${id}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  async listDocument(id: string): Promise<SupplierDocument[]> {
    const response = await api.get<ApiResponse<SupplierDocument[]>>(`/api/v1/suppliers/${id}/documents`)
    return response.data.data
  },

  async deletedDocument(id: string, documentId: string): Promise<void> {
    await api.delete(`/api/v1/suppliers/${id}/documents/${documentId}`)
  }
}
