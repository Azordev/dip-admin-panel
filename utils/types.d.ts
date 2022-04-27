export interface IEvent {
  id?: string
  title?: string
  description?: string
  date?: string
  type?: string
}

export interface IProvider {
  id?: string
  commercial_name?: string
  address?: string
  sales_phone?: string
  b2b_phone?: string
  sales_email?: string
  b2b_email?: string
  legal_name?: string
  details?: string
  latitude?: string
  longitude?: string
  is_active?: boolean
  logo_url?: string
}
