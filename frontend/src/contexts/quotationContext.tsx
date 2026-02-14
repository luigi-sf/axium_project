import { createContext, useState, useCallback } from 'react'
import api from '../services/api'

import type { Quotation, CreateQuotationDTO,UpdateQuotationDTO } from '../types/quotation/quotation'
import type { QuotationContextData } from '../types/quotation/quotation_context'

const QuotationContext = createContext<QuotationContextData>({} as QuotationContextData)

export function QuotationProvider({ children }: { children: React.ReactNode }) {
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadQuotations = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/quotations')
      setQuotations(data)
    } catch {
      setError('Erro ao carregar cotações')
    } finally {
      setLoading(false)
    }
  }, [])

  async function createQuotation(data: CreateQuotationDTO) {
    await api.post('/quotations', data)
    await loadQuotations()
  }

  async function updateQuotation(id: string, data: UpdateQuotationDTO) {
    await api.put(`/quotations/${id}`, data)
    await loadQuotations()
  }

  async function deleteQuotation(id: string) {
    await api.delete(`/quotations/${id}`)
    await loadQuotations()
  }

  return (
    <QuotationContext.Provider
      value={{
        quotations,
        loading,
        error,
        loadQuotations,
        createQuotation,
        updateQuotation,
        deleteQuotation
      }}
    >
      {children}
    </QuotationContext.Provider>
  )
}
