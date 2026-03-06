import api from './api'
import type {
  Quotation,
  CreateQuotationDTO,
  UpdateQuotationDTO
} from '../types/quotation/quotation'

export const quotationService = {

  // 🔹 Criar cotação
  async create(data: CreateQuotationDTO): Promise<Quotation> {
    const res = await api.post("/quotations", data)
    return res.data
  },

  // 🔹 Listar cotações
  async list(): Promise<Quotation[]> {
    const res = await api.get("/quotations")
    return res.data
  },

  // 🔹 Buscar por ID
  async getById(id: string): Promise<Quotation> {
    const res = await api.get(`/quotations/${id}`)
    return res.data
  },

  // 🔹 Atualizar cotação
  async update(id: string, data: UpdateQuotationDTO): Promise<Quotation> {
    const res = await api.put(`/quotations/${id}`, data)
    return res.data
  },

  // 🔹 Deletar cotação
  async remove(id: string): Promise<void> {
    await api.delete(`/quotations/${id}`)
  }
}