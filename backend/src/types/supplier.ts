export interface CreateSupplierDTO {
  userId:string
  companyName: string
  tradingName?: string
  cnpj: string
  stateRegistration?: string
  municipalRegistration?: string


  address: string
  addressNumber: string
  addressComplement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string

  phone: string
  email: string
  contactName: string
  website?: string

  businessActivity: string
  taxRegime?: "Simples_Nacional" | "Lucro_Presumido" | "Lucro_Real" | "MEI"

  bankName?: string
  bankBranch?: string
  bankAccount?: string
  bankPixKey?: string

  notes?: string
  active?: boolean
}

export interface UpdateSupplierDTO {
  companyName?: string
  tradingName?: string
  cnpj?: string
  stateRegistration?: string
  municipalRegistration?: string
  address?: string
  addressNumber?: string
  addressComplement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
  phone?: string
  email?: string
  contactName?: string
  website?: string
  businessActivity?: string
  taxRegime?: "Simples_Nacional" | "Lucro_Presumido" | "Lucro_Real" | "MEI"
  bankName?: string
  bankBranch?: string
  bankAccount?: string
  bankPixKey?: string
  notes?: string
  active?: boolean
}