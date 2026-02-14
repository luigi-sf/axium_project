import api from './api'
import type {
  Quotation,
  CreateQuotationDTO,
  UpdateQuotationDTO
} from '../types/quotation/quotation'

export const cotacaoService = {
  async list(): Promise<Quotation[]> {
    const response = await api.get('/cotacoes')
    return response.data
  },

  async create(data: CreateQuotationDTO): Promise<Quotation> {
    const response = await api.post('/cotacoes', data)
    return response.data
  },

  async update(
    id: string,
    data: UpdateQuotationDTO
  ): Promise<Quotation> {
    const response = await api.put(`/cotacoes/${id}`, data)
    return response.data
  },

  async deleted(id: string): Promise<void> {
    await api.delete(`/cotacoes/${id}`)
  }
}
