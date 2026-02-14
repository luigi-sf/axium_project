import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../../components/hooks/useProducts'
import { useSuppliers } from '../../components/hooks/useSupplier'
import type { Product } from '../../types/products/products'
import type { Supplier } from '../../types/suppliers/supplier'
import type { ProductForm } from '../../types/products/products_form'
import type { UpdateProductDTO } from '../../types/products/products'

type ProductFormEditProps = {
  product: Product
  suppliers: Supplier[]
  loading: boolean
  onSubmit: (payload: UpdateProductDTO) => Promise<void>
}

function ProductFormEdit({
  product,
  suppliers,
  loading,
  onSubmit
}: ProductFormEditProps) {
  const [form, setForm] = useState<ProductForm>({
    name: product.name,
    description: product.description ?? '',
    price: String(product.price),
    supplierId: product.supplierId
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await onSubmit({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      supplierId: form.supplierId
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Produto</h2>

      <input name="name" value={form.name} onChange={handleChange} />
      <input name="description" value={form.description} onChange={handleChange} />
      <input name="price" value={form.price} onChange={handleChange} />

      <select name="supplierId" value={form.supplierId} onChange={handleChange}>
        <option value="">Selecione o fornecedor</option>
        {suppliers.map(s => (
          <option key={s.id} value={s.id}>
            {s.companyName}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Atualizar'}
      </button>
    </form>
  )
}

export default function EditProduct() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { products, updateProduct, loading } = useProduct()
  const { suppliers, loadSuppliers } = useSuppliers()

  useEffect(() => {
    loadSuppliers()
  }, [loadSuppliers])

  const product = useMemo<Product | undefined>(
    () => products.find(p => p.id === id),
    [products, id]
  )

  if (!product) return <p>Produto não encontrado</p>

  async function handleUpdate(payload: UpdateProductDTO) {
    if (!id) return
    await updateProduct(id, payload)
    navigate('/products')
  }

  return (
    <ProductFormEdit
      key={product.id}
      product={product}
      suppliers={suppliers}
      loading={loading}
      onSubmit={handleUpdate}
    />
  )
}
