export interface Stats {
  totalFornecedores: number;
  cotacoesAtivas: number;
  valorTotalCotacoes: number;
  cotacoesPendentes: number;
}


export type SupplierView = {
  id: string;
  companyName:string
  name: string;
  cnpj: string;
  email:string
  active: "ativo" | "inativo";
};


export type QuotationView = {
  id: string;
  title: string;
  status: "aberta" | "em_analise" | "fechada" | "cancelada";
};

export type StatsView = {
  title: string;
  value: number;
};


