import { useEffect } from 'react'
import { useQuotation } from '../../components/hooks/usequotation'
import { useNavigate } from 'react-router-dom'

export default function QuotationsPage() {
  const { quotations, loadQuotations, loading, error } = useQuotation()
  const navigate = useNavigate()

  useEffect(() => {
    loadQuotations()
  }, [loadQuotations])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Cotações</h1>

      <button onClick={() => navigate('/quotations/new')}>
        Nova Cotação
      </button>

      <table>
        <thead>
          <tr>
            <th>Fornecedor</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {quotations.map(q => (
            <tr key={q.id}>
              <td>{q.supplierName}</td>
              <td>R$ {q.total.toFixed(2)}</td>
              <td>{q.status}</td>
              <td>
                <button onClick={() => navigate(`/quotations/edit/${q.id}`)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
