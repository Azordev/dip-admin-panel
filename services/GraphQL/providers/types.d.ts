export interface ProviderBase {
  commercial_name: string
  b2b_email: string
  is_active: boolean
  avatar_url?: string
  address?: string
  sales_phone?: string
  b2b_phone?: string
  sales_email?: string
  legal_name?: string
  details?: string
  logo_url?: string
}

export interface ProviderEditable extends ProviderBase {
  commercial_name?: string
  b2b_email?: string
  is_active?: boolean
}

export interface Provider extends ProviderBase {
  id: string
  created_at?: string
  updated_at?: string
}
