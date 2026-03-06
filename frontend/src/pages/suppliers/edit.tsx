import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { CreateSupplierDTO } from "../../types/suppliers/supplier";

export const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado único para todo o supplier
  const [supplier, setSupplier] = useState<Partial<CreateSupplierDTO>>({
    companyName: "",
    tradingName: "",
    cnpj: "",
    stateRegistration: "",
    municipalRegistration: "",
    address: "",
    addressNumber: "",
    addressComplement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    contactName: "",
    website: "",
    businessActivity: "",
    taxRegime: "Simples_Nacional",
    bankName: "",
    bankBranch: "",
    bankAccount: "",
    bankPixKey: "",
    notes: "",
    active: true
  });

  useEffect(() => {
    async function loadSupplier() {
      try {
        const response = await api.get(`/suppliers/${id}`);
        const data = response.data.data;

        setSupplier(data);
      } catch (error) {
        console.error("Erro ao carregar fornecedor:", error);
      }
    }

    loadSupplier();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.put(`/suppliers/edit/${id}`, supplier);
      navigate("/suppliers");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  // Função genérica para atualizar qualquer campo
  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  const { name, value } = e.target;

  let newValue: string | boolean = value;

  // Type guard para checkbox
  if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
    newValue = e.target.checked;
  }

  setSupplier((prev) => ({
    ...prev,
    [name]: newValue
  }));
}

  return (
    <div>
      <h2>Editar Fornecedor</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="companyName"
          value={supplier.companyName || ""}
          onChange={handleChange}
          placeholder="Nome da empresa"
        />

        <input
          type="text"
          name="tradingName"
          value={supplier.tradingName || ""}
          onChange={handleChange}
          placeholder="Nome fantasia"
        />

        <input
          type="text"
          name="cnpj"
          value={supplier.cnpj || ""}
          onChange={handleChange}
          placeholder="CNPJ"
        />

        <input
          type="text"
          name="stateRegistration"
          value={supplier.stateRegistration || ""}
          onChange={handleChange}
          placeholder="Inscrição Estadual"
        />

        <input
          type="text"
          name="municipalRegistration"
          value={supplier.municipalRegistration || ""}
          onChange={handleChange}
          placeholder="Inscrição Municipal"
        />

        <input
          type="text"
          name="address"
          value={supplier.address || ""}
          onChange={handleChange}
          placeholder="Endereço"
        />

        <input
          type="text"
          name="addressNumber"
          value={supplier.addressNumber || ""}
          onChange={handleChange}
          placeholder="Número"
        />

        <input
          type="text"
          name="addressComplement"
          value={supplier.addressComplement || ""}
          onChange={handleChange}
          placeholder="Complemento"
        />

        <input
          type="text"
          name="neighborhood"
          value={supplier.neighborhood || ""}
          onChange={handleChange}
          placeholder="Bairro"
        />

        <input
          type="text"
          name="city"
          value={supplier.city || ""}
          onChange={handleChange}
          placeholder="Cidade"
        />

        <input
          type="text"
          name="state"
          value={supplier.state || ""}
          onChange={handleChange}
          placeholder="Estado"
        />

        <input
          type="text"
          name="zipCode"
          value={supplier.zipCode || ""}
          onChange={handleChange}
          placeholder="CEP"
        />

        <input
          type="text"
          name="phone"
          value={supplier.phone || ""}
          onChange={handleChange}
          placeholder="Telefone"
        />

        <input
          type="email"
          name="email"
          value={supplier.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="contactName"
          value={supplier.contactName || ""}
          onChange={handleChange}
          placeholder="Nome do contato"
        />

        <input
          type="text"
          name="website"
          value={supplier.website || ""}
          onChange={handleChange}
          placeholder="Website"
        />

        <input
          type="text"
          name="businessActivity"
          value={supplier.businessActivity || ""}
          onChange={handleChange}
          placeholder="Atividade empresarial"
        />

        <select
          name="taxRegime"
          value={supplier.taxRegime || "Simples_Nacional"}
          onChange={handleChange}
        >
          <option value="Simples_Nacional">Simples Nacional</option>
          <option value="Lucro_Presumido">Lucro Presumido</option>
          <option value="Lucro_Real">Lucro Real</option>
          <option value="MEI">MEI</option>
        </select>

        <input
          type="text"
          name="bankName"
          value={supplier.bankName || ""}
          onChange={handleChange}
          placeholder="Banco"
        />

        <input
          type="text"
          name="bankBranch"
          value={supplier.bankBranch || ""}
          onChange={handleChange}
          placeholder="Agência"
        />

        <input
          type="text"
          name="bankAccount"
          value={supplier.bankAccount || ""}
          onChange={handleChange}
          placeholder="Conta"
        />

        <input
          type="text"
          name="bankPixKey"
          value={supplier.bankPixKey || ""}
          onChange={handleChange}
          placeholder="Chave PIX"
        />

        <textarea
          name="notes"
          value={supplier.notes || ""}
          onChange={handleChange}
          placeholder="Observações"
        />

        <label>
          Ativo:
          <input
            type="checkbox"
            name="active"
            checked={supplier.active || false}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};