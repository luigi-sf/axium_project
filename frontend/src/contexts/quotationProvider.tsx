import { useState, useEffect } from "react"
import { QuotationContext } from "../types/quotation/quotation_context"
import { quotationService } from "../services/quotation"
import type { 
  Quotation, 
  CreateQuotationDTO, 
  UpdateQuotationDTO 
} from "../types/quotation/quotation"

interface Props {
  children: React.ReactNode
}

export function QuotationProvider({ children }: Props) {

  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadQuotations() {
    try {
      setLoading(true)
      setError(null)

      const data = await quotationService.list()
      setQuotations(data)

    } catch (err) {
      console.error("Erro ao carregar cotações", err)
      setError("Erro ao carregar cotações")

    } finally {
      setLoading(false)
    }
  }

  async function getQuotationById(id: string): Promise<Quotation | null> {
  try {
    const quotation = await quotationService.getById(id)
    return quotation
  } catch (err) {
    console.error("Erro ao buscar cotação", err)
    setError("Erro ao buscar cotação")
    return null
  }
}

  async function createQuotation(data: CreateQuotationDTO) {
    try {
      setError(null)

      const newQuotation = await quotationService.create(data)

      setQuotations((prev) => [...prev, newQuotation])

    } catch (err) {
      console.error("Erro ao criar cotação", err)
      setError("Erro ao criar cotação")
    }
  }

  async function updateQuotation(id: string, data: UpdateQuotationDTO) {
    try {
      setError(null)

      const updated = await quotationService.update(id, data)

      setQuotations((prev) =>
        prev.map((q) => (q.id === id ? updated : q))
      )

    } catch (err) {
      console.error("Erro ao atualizar cotação", err)
      setError("Erro ao atualizar cotação")
    }
  }

  async function deleteQuotation(id: string) {
    try {
      setError(null)

      await quotationService.remove(id)

      setQuotations((prev) =>
        prev.filter((q) => q.id !== id)
      )

    } catch (err) {
      console.error("Erro ao deletar cotação", err)
      setError("Erro ao deletar cotação")
    }
  }

  useEffect(() => {
    loadQuotations()
  }, [])

  return (
    <QuotationContext.Provider
      value={{
        quotations,
        loading,
        error,
        loadQuotations,
        getQuotationById,
        createQuotation,
        updateQuotation,
        deleteQuotation
      }}
    >
      {children}
    </QuotationContext.Provider>
  )
}