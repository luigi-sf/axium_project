export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
  active:'ativo' | 'inativo'
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  supplierId: string;
  active?: 'ativo' | 'inativo' 
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  supplierId: string;
}

export interface ProductImage {
  id: string
  url: string
  filename: string
  createdAt: string
}
