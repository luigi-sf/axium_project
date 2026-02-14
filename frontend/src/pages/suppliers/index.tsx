// src/pages/suppliers/index.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../components/hooks/useSupplier";

export default function SuppliersPage() {
  const {
    suppliers,
    loading,
    error,
    loadSuppliers,
    deleteSupplier,
  } = useSuppliers();

  const navigate = useNavigate();

  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este fornecedor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSupplier(id);

      // 🔥 Recarrega lista após excluir
      await loadSuppliers();
    } catch (err) {
      console.error("Erro ao excluir fornecedor:", err);
    }
  };

  if (loading) return <p>Carregando fornecedores...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <h1>Meus Fornecedores</h1>
        <button
          className="primary-btn"
          onClick={() => navigate("/suppliers/new")}
        >
          Novo Fornecedor
        </button>
      </div>

      <table className="suppliers-table">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Email</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Nenhum fornecedor cadastrado
              </td>
            </tr>
          ) : (
            suppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.companyName}</td>
                <td>{s.email}</td>
                <td>
                  <span className={s.active ? "status-active" : "status-inactive"}>
                    {s.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/suppliers/edit/${s.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
