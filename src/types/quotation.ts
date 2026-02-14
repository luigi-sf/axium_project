interface QuotationItemDTO {
  productId: string;
  quantity: number;
  price?: number;
}

interface QuotationDTO {
  supplierId: string;
  userId: string;
  status?: string;
  items: QuotationItemDTO[];
}
