import type { CreateQuotationDTO,UpdateQuotationDTO,Quotation } from "./quotation"

export interface QuotationContextData {
  quotations: Quotation[]
  loading: boolean
  error: string | null
  getQuotationById?: (id: string) => Promise<Quotation>
  loadQuotations: () => Promise<void>
  createQuotation: (data: CreateQuotationDTO) => Promise<void>
  updateQuotation: (id: string, data: UpdateQuotationDTO) => Promise<void>
  deleteQuotation: (id: string) => Promise<void>
}


