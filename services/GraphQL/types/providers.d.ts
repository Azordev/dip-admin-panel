export interface ProviderBase {
  created_at?: string
  updated_at?: string
  avatar_url?: string
  commercial_name: string
  address?: string
  sales_phone?: string
  b2b_phone?: string
  sales_email?: string
  b2b_email?: string
  legal_name?: string
  details?: string
  is_active?: boolean
  logo_url?: string
}

export interface Provider extends ProviderBase {
  id: string
}
