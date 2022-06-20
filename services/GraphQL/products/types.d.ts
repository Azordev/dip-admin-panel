import { Provider } from '../providers/types'

export const productInfo = `
  name
  description
  details
  offer_discount
  base_price_sol
  with_offer
  image_url
  available
  unit_system
`

export interface ProductBase {
  name: string
  description?: string
  details?: string
  offer_discount?: number
  base_price_sol: number
  with_offer: boolean
  image_url?: string
  available: boolean
  unit_system?: string
}

export interface ProductEditable extends ProductBase {
  name?: string
  base_price_sol?: number
  with_offer?: boolean
}

export interface Product extends ProductBase {
  id: string
  provider_id: string
  provider: Provider
  categories?: {
    stats: {
      count: number
    }
  }
  created_at: string
  updated_at: string
}
