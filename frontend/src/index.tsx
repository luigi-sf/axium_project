import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { AuthProvider } from './contexts/authProvider'
import { ProductProvider } from './contexts/productContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
      <App />
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
)
