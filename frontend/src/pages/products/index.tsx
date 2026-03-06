import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../components/hooks/useProducts'

export default function ProductsPage() {
  const navigate = useNavigate()

  const {
    products,
    loading,
    error,
    loadProducts,
    deleteProduct
  } = useProduct()

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Produtos</h1>

      <button onClick={() => navigate('/products/new')}>
        Novo Produto
      </button>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
  {products.map(product => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>R$ {product.price.toFixed(2)}</td>
      <td>{product.active ? 'Ativo' : 'Inativo'}</td>
      <td>
        <button onClick={() => navigate(`/products/edit/${product.id}`)}>Editar</button>
        <button onClick={() => deleteProduct(product.id)}>Excluir</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  )
}
