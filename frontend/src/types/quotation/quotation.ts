export interface QuotationItem {
  productId: string
  productName: string
  quotedPrice: number
}

export interface Quotation {
  id: string
  supplierId: string
  supplierName: string
  items: QuotationItem[]
  total: number
  status: 'aberta' | 'fechada' | 'cancelada'
  createdAt: string
}

export interface CreateQuotationDTO {
  supplierName?:string
  title:string
  items: {
    productId: string
    quotedPrice: number
  }[]
}

export type UpdateQuotationDTO = CreateQuotationDTO & {
  status?: 'aberta' | 'fechada' | 'cancelada'
}
