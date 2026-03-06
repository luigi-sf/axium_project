import { createContext } from "react"
import type { Quotation, CreateQuotationDTO, UpdateQuotationDTO } from "./quotation"

export interface QuotationContextData {
  quotations: Quotation[]
  loading: boolean
    error: string | null
  
  loadQuotations: () => Promise<void>
  getQuotationById: (id: string) => Promise<Quotation | null>
  createQuotation: (data: CreateQuotationDTO) => Promise<void>
  updateQuotation: (id: string, data: UpdateQuotationDTO) => Promise<void>
  deleteQuotation: (id: string) => Promise<void>
}

export const QuotationContext = createContext({} as QuotationContextData)