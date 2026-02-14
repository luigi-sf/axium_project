import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO
} from '../products/products'

export interface ProductContextData {
  
  products: Product[]
  loading: boolean
  error: string | null

  getProductById: (id: string) => Promise<Product | null>

  loadProducts: () => Promise<void>

  createProduct: (data: CreateProductDTO) => Promise<Product>
  updateProduct: (id: string, data: UpdateProductDTO) => Promise<Product>
  deleteProduct: (id: string) => Promise<void>

  uploadImage: (productId: string, file: File) => Promise<unknown>
  listImages: (productId: string) => Promise<unknown[]> 
  deleteImage: (productId: string, imageId: string) => Promise<void>
}