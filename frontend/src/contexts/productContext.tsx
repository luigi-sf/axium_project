import { useState,useCallback } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'

import { productService } from '../services/produts'


import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductImage
} from '../types/products/products'

import { ProductContext } from './product'

function getErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError<{ message?: string }>(err)) {
    return err.response?.data?.message ?? fallback
  }

  if (err instanceof Error) {
    return err.message
  }

  return fallback
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
  setLoading(true)
  setError(null)

  try {
    const data = await productService.list()
    setProducts(data)
  } catch (err: unknown) {
    setError(getErrorMessage(err, 'Erro ao carregar produtos'))
  } finally {
    setLoading(false)
  }
}, [])


  async function getProductById(id: string): Promise<Product> {
    try {
      return await productService.getById(id)
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Erro ao buscar produto'))
      throw err
    }
  }

  async function createProduct(
    data: CreateProductDTO
  ): Promise<Product> {
    try {
      const product = await productService.create(data)
      setProducts(prev => [...prev, product])
      return product
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Erro ao criar produto'))
      throw err
    }
  }

  async function updateProduct(
    id: string,
    data: UpdateProductDTO
  ): Promise<Product> {
    try {
      const updated = await productService.update(id, data)
      setProducts(prev =>
        prev.map(p => (p.id === id ? updated : p))
      )
      return updated
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Erro ao atualizar produto'))
      throw err
    }
  }

  async function deleteProduct(id: string): Promise<void> {
    try {
      await productService.remove(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Erro ao deletar produto'))
      throw err
    }
  }

  async function uploadImage(
    productId: string,
    file: File
  ): Promise<ProductImage> {
    return productService.uploadImage(productId, file)
  }

  async function listImages(
    productId: string
  ): Promise<ProductImage[]> {
    return productService.listImages(productId)
  }

  async function deleteImage(
    productId: string,
    imageId: string
  ): Promise<void> {
    await productService.removeImage(productId, imageId)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        loadProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        listImages,
        deleteImage
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
