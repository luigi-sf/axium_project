import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    async function loadSupplier() {
      try {
        const response = await api.get(`/api/v1/suppliers/${id}`);

        const supplier = response.data.data;

        setCompanyName(supplier.companyName);
        setEmail(supplier.email);
        setActive(supplier.active);
      } catch (error) {
        console.error("Erro ao carregar fornecedor:", error);
      }
    }

    loadSupplier();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.put(`/api/v1/suppliers/${id}`,{
        companyName,
        email,
        active,
      });

      navigate('/suppliers');
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  return (
    <div>
      <h2>Editar Fornecedor</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Nome da empresa"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <label>
          Ativo:
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};
