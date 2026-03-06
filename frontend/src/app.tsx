import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./components/hooks/useAuth";
import api from "./services/api";

import Login from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import { Dashboard } from "./pages/Dashboard";

import SupplierForm from "./pages/suppliers/create";
import SuppliersPage from "./pages/suppliers/index";
import { EditSupplier } from "./pages/suppliers/edit";

import ProductList from "./pages/products/index";
import CreateProduct from "./pages/products/create";
import EditProduct from "./pages/products/edit";

import QuotationList from "./pages/quotations/index";
import CreateQuotation from "./pages/quotations/create";

import AppLayout from "./assets/layouts/appLayout";

import { SupplierProvider } from "./contexts/supplierProvider";

export default function App() {
  const { token, logout } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) logout();
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout]);

  return (
    <BrowserRouter>
      <Routes>
        {/* rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* rotas privadas */}
        {token && (
          <Route
            path="/"
            element={
              <SupplierProvider>
                <AppLayout />
              </SupplierProvider>
            }
          >
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/suppliers/new" element={<SupplierForm />} />
            <Route path="/suppliers/edit/:id" element={<EditSupplier />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<CreateProduct />} />
             <Route path="/products/edit/:id" element={<EditProduct />} />

            <Route path="/quotations" element={<QuotationList />} />
            <Route path="/quotations/new" element={<CreateQuotation />} />
          </Route>
        )}

        {/* fallback */}
        <Route
          path="*"
          element={<Navigate to={token ? "/Dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}