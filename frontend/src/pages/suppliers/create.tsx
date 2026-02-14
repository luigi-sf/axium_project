import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuppliers } from '../../components/hooks/useSupplier';
import type { SupplierForm } from '../../types/suppliers/supplier_form';
import type { CreateSupplierDTO } from '../../types/suppliers/supplier';
import '../../assets/styles/supplier_form.scss';

const initialState: SupplierForm = {
  companyName: '',
  cnpj: '',
  email: '',
  phone: '',
  contactName: '',
  businessActivity: '',
  password: '',
  address: '',
  addressNumber: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
  active: true // adiciona o campo ativo no state
};

export default function SupplierForm() {
  const { createSupplier, loading } = useSuppliers();
  const [form, setForm] = useState<SupplierForm>(initialState);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    // Converte select para boolean
    if (name === 'active') {
      setForm(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: CreateSupplierDTO = {
      ...form,
      active: form.active // boolean agora
    };

    try {
      await createSupplier(payload);
      setForm(initialState);
      navigate('/suppliers'); // vai para lista de fornecedores
    } catch (error) {
      console.error(error);
      alert('Erro ao criar fornecedor!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Fornecedor</h2>

      <input name="companyName" placeholder="Razão social" value={form.companyName} onChange={handleChange} required />
      <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
      <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} />

      <input name="contactName" placeholder="Nome do responsável" value={form.contactName} onChange={handleChange} />
      <input name="businessActivity" placeholder="Atividade da empresa" value={form.businessActivity} onChange={handleChange} />

      <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} required />

      <input name="address" placeholder="Endereço" value={form.address} onChange={handleChange} />
      <input name="addressNumber" placeholder="Número" value={form.addressNumber} onChange={handleChange} />
      <input name="neighborhood" placeholder="Bairro" value={form.neighborhood} onChange={handleChange} />
      <input name="city" placeholder="Cidade" value={form.city} onChange={handleChange} />
      <input name="state" placeholder="Estado" value={form.state} onChange={handleChange} />
      <input name="zipCode" placeholder="CEP" value={form.zipCode} onChange={handleChange} />

      <label>Status:</label>
      <select name="active" value={form.active.toString()} onChange={handleChange}>
        <option value="true">Ativo</option>
        <option value="false">Inativo</option>
      </select>

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
