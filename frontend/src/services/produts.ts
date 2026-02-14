import api from './api'
import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductImage
} from '../types/products/products'


export const productService = {
  async list(params?: Record<string, unknown>): Promise<Product[]> {
    const response = await api.get('/api/v1/products', { params })
    return response.data
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get(`/api/v1/products/${id}`)
    return response.data
  },

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await api.post('/api/v1/products', data)
    return response.data
  },

  async update(
    id: string,
    data: UpdateProductDTO
  ): Promise<Product> {
    const response = await api.put(`/api/v1/products/${id}`, data)
    return response.data
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/api/v1/products/${id}`)
  },

  async uploadImage(
    productId: string,
    file: File
  ): Promise<ProductImage> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post(
      `/api/v1/products/${productId}/images`,
      formData
    )

    return response.data
  },

  async listImages(
    productId: string
  ): Promise<ProductImage[]> {
    const response = await api.get(
      `/api/v1/products/${productId}/images`
    )
    return response.data
  },

  async removeImage(
    productId: string,
    imageId: string
  ): Promise<void> {
    await api.delete(
      `/api/v1/products/${productId}/images/${imageId}`
    )
  }
}
