interface QuotationItemDTO {
  productId: string;
  quantity: number;
  price?: number;
}

export interface QuotationDTO {
  supplierId: string
  userId: string
  status?:string
  items: {
    productId: string
    quantity: number
    price: number
  }[]
}