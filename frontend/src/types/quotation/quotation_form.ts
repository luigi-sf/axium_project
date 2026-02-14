export interface QuotationItemForm {
  productId: string
  quotedPrice: string
}

export interface QuotationForm {
  supplierId: string
  items: QuotationItemForm[]
}
