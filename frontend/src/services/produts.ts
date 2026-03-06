import api from './api'
import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductImage
} from '../types/products/products'


export const productService = {
  async list(params?: Record<string, unknown>): Promise<Product[]> {
    const response = await api.get('/products', { params })
    return response.data.data
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`)
    return response.data.data
  },

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await api.post('/products', data)
    return response.data.data
  },

  async update(
    id: string,
    data: UpdateProductDTO
  ): Promise<Product> {
    const response = await api.put(`/products/edit/${id}`, data)
    return response.data.data
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/products/${id}`)
  },

  async uploadImage(
    productId: string,
    file: File
  ): Promise<ProductImage> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post(
      `/products/${productId}/images`,
      formData
    )

    return response.data
  },

  async listImages(
    productId: string
  ): Promise<ProductImage[]> {
    const response = await api.get(
      `/products/${productId}/images`
    )
    return response.data
  },

  async removeImage(
    productId: string,
    imageId: string
  ): Promise<void> {
    await api.delete(
      `/products/${productId}/images/${imageId}`
    )
  }
}
