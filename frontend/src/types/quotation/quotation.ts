export interface QuotationItem {
  productId: string
  productName: string
  quotedPrice: number
}

export interface Quotation {
  id: string
  title: string
  supplierId: string
  supplierName: string
  items: QuotationItem[]
  total: number
  status: 'aberta' | 'fechada' | 'cancelada'
  createdAt: string
}

export interface CreateQuotationDTO {
  supplierId: string
  title: string
  items: {
    productId: string
    quotedPrice: number
  }[]
}

export interface UpdateQuotationDTO {
  supplierId?: string
  title?: string
  items?: {
    productId: string
    quotedPrice: number
  }[]
  status?: 'aberta' | 'fechada' | 'cancelada'
}