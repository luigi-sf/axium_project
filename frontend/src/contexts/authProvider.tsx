import { useState } from "react"
import type { ReactNode } from "react"
import { AuthContext } from "./authContext"
import type { User } from "../types/user"
import type { Credentials, SignupDTO } from "../types/auth/auth"
import { authService } from "../services/auth_service"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isAuthenticated = !!token

  async function login(credentials: Credentials): Promise<boolean> {
    setLoading(true)
    try {
      const response = await authService.login(credentials)

      setToken(response.token)

      localStorage.setItem("token", response.token)

      return true
    } catch (error) {
      console.error("Erro no login:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  async function signup(data: SignupDTO): Promise<boolean> {
    setLoading(true)
    try {
      const response = await authService.signup(data)

      setToken(response.token)

      localStorage.setItem("token", response.token)

      return true
    } catch (error) {
      console.error("Erro no signup:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken(null)

    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
