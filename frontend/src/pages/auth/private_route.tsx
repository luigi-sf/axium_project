import { Navigate } from 'react-router-dom'
import { useAuth } from '../../components/hooks/useAuth'

export function PrivateRoute({ children }: { children: Element }) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
