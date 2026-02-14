import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../components/hooks/useProducts'
import { useSuppliers } from '../../components/hooks/useSupplier'
import type { ProductForm } from '../../types/products/products_form'
import type { CreateProductDTO } from '../../types/products/products'

const initialState: ProductForm = {
  name: '',
  description: '',
  price: '',
  supplierId: ''
}

export default function CreateProduct() {
  const navigate = useNavigate()
  const { createProduct, loading } = useProduct()
  const { suppliers, loadSuppliers } = useSuppliers()

  const [form, setForm] = useState<ProductForm>(initialState)

  useEffect(() => {
    loadSuppliers()
  }, [loadSuppliers])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.name || !form.price || !form.supplierId) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const payload: CreateProductDTO = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      supplierId: form.supplierId
    }

    await createProduct(payload)
    navigate('/products')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Produto</h2>

      <input
        name="name"
        placeholder="Nome do produto"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Preço"
        value={form.price}
        onChange={handleChange}
      />

      <select
        name="supplierId"
        value={form.supplierId}
        onChange={handleChange}
      >
        <option value="">Selecione o fornecedor</option>
        {suppliers.map(s => (
          <option key={s.id} value={s.id}>
            {s.companyName}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}
