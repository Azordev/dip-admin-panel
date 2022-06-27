import { gql } from '@apollo/client'

import { Provider } from '../providers/types.d'

export const productInfo = gql`
  fragment ProductInfoFragment on products {
    name
    description
    basePriceSol: base_price_sol
    imageUrl: image_url
  }
`

export interface ProductBase {
  name: string
  basePriceSol: number
  description?: string
  imageUrl?: string
}

export interface ProductEditable extends ProductBase {
  name?: string
  basePriceSol?: number
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

export interface MutableProductFormProps {
  onSubmit: (_formData: ProductEditable) => void
  loading: boolean
  originalData?: Product
}
