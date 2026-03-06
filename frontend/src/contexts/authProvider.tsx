import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { User } from "../types/user";
import type { Credentials, SignupDTO } from "../types/auth/auth";
import { authService } from "../services/auth_service";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) setToken(storedToken);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Erro ao carregar user/token do localStorage:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  async function login(credentials: Credentials): Promise<boolean> {
    setLoading(true);

    try {
      const response = await authService.login(credentials);

      if (!response || !response.token || !response.user) {
        console.error("Login falhou: response inválido", response);
        return false;
      }

      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signup(data: SignupDTO): Promise<boolean> {
    setLoading(true);

    try {
      const response = await authService.signup(data);

      if (!response || !response.token || !response.user) {
        console.error("Signup falhou: response inválido", response);
        return false;
      }

      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      return true;
    } catch (error) {
      console.error("Erro no signup:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}