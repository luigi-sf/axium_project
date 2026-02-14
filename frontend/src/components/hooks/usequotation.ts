import { useContext,createContext } from "react"
import type { QuotationContextData } from "../../types/quotation/quotation_context"


const QuotationContext = createContext<QuotationContextData>({} as QuotationContextData)

export function useQuotation() {
  return useContext(QuotationContext)
}
