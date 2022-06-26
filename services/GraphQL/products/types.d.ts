import { gql } from '@apollo/client'

import { Provider } from '../providers/types'

export const productInfo = gql`
  fragment ProductInfoFragment on products {
    name
    description
    details
    offerDiscount: offer_discount
    basePriceSol: base_price_sol
    withOffer: with_offer
    imageUrl: image_url
    available
    unitSystem: unit_system
  }
`

export interface ProductBase {
  name: string
  description?: string
  details?: string
  offerDiscount?: number
  basePriceSol: number
  withOffer: boolean
  imageUrl?: string
  available: boolean
  unitSystem?: string
}

export interface ProductEditable extends ProductBase {
  name?: string
  basePriceSol?: number
  withOffer?: boolean
}

export interface Product extends ProductBase {
  id: string
  providerId: string
  provider: Provider
  categories?: {
    stats: {
      count: number
    }
  }
  createdAt: string
  updatedAt: string
}
