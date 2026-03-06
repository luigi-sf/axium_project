import { useMemo, useEffect, useState } from "react";
import { useAuth } from "../components/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "../assets/styles/dashboard.scss";

import type { StatsView } from "../types/dashboard";
import type { SupplierView } from "../types/dashboard";
import type { QuotationView } from "../types/dashboard";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState<SupplierView[]>([]);
  const [quotations] = useState<QuotationView[]>([]);

  useEffect(() => {
    async function loadSuppliers() {
      try {
        const response = await api.get("/suppliers");

        console.log("SUPPLIERS RESPONSE:", response.data);
         console.log("🔥 RESPONSE COMPLETA:", response);
      console.log("🔥 RESPONSE DATA:", response.data);

        setSuppliers(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      }
    }

    loadSuppliers();
  }, []);

  const stats: StatsView[] = useMemo(
    () => [
      { title: "Fornecedores", value: suppliers.length },
      { title: "Cotações", value: quotations.length },
      { title: "Pedidos Abertos", value: 0 },
      { title: "Pedidos Fechados", value: 0 },
    ],
    [suppliers, quotations]
  );

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-layout">
      <div className="dashboard">
        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Olá, {user?.name || "Usuário"}</h2>
          <div className="header-right">
            <span className="date">{today}</span>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.title} className="stat-card">
              <h4>{stat.title}</h4>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* TABLES */}
        <div className="dashboard-grid">
          {/* FORNECEDORES */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Fornecedores</h3>
              <button
                className="action-btn"
                onClick={() => navigate("/suppliers/new")}
              >
                Cadastrar Fornecedor
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.companyName}</td>
                    <td>{supplier.email}</td>
                    <td>
                      <span
                        className={`status ${
                          supplier.active ? "ativo" : "inativo"
                        }`}
                      >
                        {supplier.active ? "ativo" : "inativo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COTAÇÕES  */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Cotações</h3>
              <button
                className="action-btn"
                onClick={() => navigate("/quotations/new")}
              >
                Nova Cotação
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quote) => (
                  <tr key={quote.id}>
                    <td>{quote.title}</td>
                    <td>
                      <span className={`status ${quote.status}`}>
                        {quote.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
