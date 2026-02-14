import { useState } from 'react'
import { useAuth } from '../../components/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import "../../assets/styles/signup.scss"

export default function SignupPage() {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      await signup({ name, email, password })
      navigate('/Dashboard')
    } catch {
      setError('Erro ao cadastrar usuário')
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo">AXIUM</div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="auth-footer">
          Já tem conta?{' '}
          <a onClick={() => navigate('/login')}>
            Entrar
          </a>
        </div>
      </div>
    </div>
  )
}
