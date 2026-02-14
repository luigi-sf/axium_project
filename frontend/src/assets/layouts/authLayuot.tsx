import type { ReactNode } from 'react'
import '../styles/auth.scss'

interface Props {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="auth-wrapper">
      <div className="auth-glow" />
      <div className="auth-card">
        {children}
      </div>
    </div>
  )
}
