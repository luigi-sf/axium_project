import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuppliers } from '../../components/hooks/useSupplier';
import type { CreateSupplierDTO } from '../../types/suppliers/supplier';
import '../../assets/styles/supplier_form.scss';

export default function SupplierForm() {
  const { createSupplier, loading } = useSuppliers();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<CreateSupplierDTO>>({
    companyName: '',
    tradingName: '',
    cnpj: '',
    stateRegistration: '',
    municipalRegistration: '',
    address: '',
    addressNumber: '',
    addressComplement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    contactName: '',
    website: '',
    businessActivity: '',
    taxRegime: 'Simples_Nacional',
    bankName: '',
    bankBranch: '',
    bankAccount: '',
    bankPixKey: '',
    notes: '',
    active: true
  });

  // handleChange genérico
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      newValue = e.target.checked;
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createSupplier(form as CreateSupplierDTO);
      setForm({});
      navigate('/suppliers');
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      alert('Erro ao criar fornecedor!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Fornecedor</h2>

      <input name="companyName" placeholder="Razão social" value={form.companyName || ''} onChange={handleChange} required />
      <input name="tradingName" placeholder="Nome fantasia" value={form.tradingName || ''} onChange={handleChange} />
      <input name="cnpj" placeholder="CNPJ" value={form.cnpj || ''} onChange={handleChange} required />
      <input name="stateRegistration" placeholder="Inscrição estadual" value={form.stateRegistration || ''} onChange={handleChange} />
      <input name="municipalRegistration" placeholder="Inscrição municipal" value={form.municipalRegistration || ''} onChange={handleChange} />

      <input name="address" placeholder="Endereço" value={form.address || ''} onChange={handleChange} />
      <input name="addressNumber" placeholder="Número" value={form.addressNumber || ''} onChange={handleChange} />
      <input name="addressComplement" placeholder="Complemento" value={form.addressComplement || ''} onChange={handleChange} />
      <input name="neighborhood" placeholder="Bairro" value={form.neighborhood || ''} onChange={handleChange} />
      <input name="city" placeholder="Cidade" value={form.city || ''} onChange={handleChange} />
      <input name="state" placeholder="Estado" value={form.state || ''} onChange={handleChange} />
      <input name="zipCode" placeholder="CEP" value={form.zipCode || ''} onChange={handleChange} />

      <input name="phone" placeholder="Telefone" value={form.phone || ''} onChange={handleChange} />
      <input name="email" placeholder="E-mail" value={form.email || ''} onChange={handleChange} />
      <input name="contactName" placeholder="Nome do responsável" value={form.contactName || ''} onChange={handleChange} />
      <input name="website" placeholder="Website" value={form.website || ''} onChange={handleChange} />

      <input name="businessActivity" placeholder="Atividade da empresa" value={form.businessActivity || ''} onChange={handleChange} />
      <select name="taxRegime" value={form.taxRegime || 'Simples_Nacional'} onChange={handleChange}>
        <option value="Simples_Nacional">Simples Nacional</option>
        <option value="Lucro_Presumido">Lucro Presumido</option>
        <option value="Lucro_Real">Lucro Real</option>
        <option value="MEI">MEI</option>
      </select>

      <input name="bankName" placeholder="Banco" value={form.bankName || ''} onChange={handleChange} />
      <input name="bankBranch" placeholder="Agência" value={form.bankBranch || ''} onChange={handleChange} />
      <input name="bankAccount" placeholder="Conta" value={form.bankAccount || ''} onChange={handleChange} />
      <input name="bankPixKey" placeholder="Chave PIX" value={form.bankPixKey || ''} onChange={handleChange} />

      <textarea name="notes" placeholder="Observações" value={form.notes || ''} onChange={handleChange} />

      <label>
        Ativo:
        <input type="checkbox" name="active" checked={form.active || false} onChange={handleChange} />
      </label>

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}