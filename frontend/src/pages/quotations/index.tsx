import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuotation } from '../../components/hooks/usequotation'

export default function QuotationList() {
  const navigate = useNavigate()

  const {
    quotations,
    loading,
    error,
    loadQuotations,
    deleteQuotation
  } = useQuotation()

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
            <th>Título</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {quotations.map(q => (
            <tr key={q.id}>
              <td>{q.supplierName}</td>
              <td>{q.status}</td>
              <td>
                <button
                  onClick={() =>
                    navigate('dashboard')
                  }
                >
                  Editar
                </button>

                <button
                  onClick={() => {
                    if (confirm('Deseja excluir esta cotação?')) {
                      deleteQuotation(q.id)
                    }
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
