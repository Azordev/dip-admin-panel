import { gql } from '@apollo/client'

import { Product } from '@/services/GraphQL/products/types'

export const providerInfo = gql`
  fragment ProviderInfoFragment on providers {
    id
    address
    commercialName: commercial_name
    b2bPhone: b2b_phone
    salesEmail: sales_email
    b2bEmail: b2b_email
    legalName: legal_name
    logoUrl: logo_url
    catalogUrl: catalog_url
    salesPhone: sales_phone # use for whatsapp number
    plan
    orderIndex: order_index
    isActive: is_active
  }
`

export interface ProviderBase {
  commercialName: string
  isActive: boolean
  logoUrl: string
  salesPhone: string
  b2bEmail: string
  plan: string
  orderIndex: number
}

export interface ProviderEditable extends ProviderBase {
  commercialName?: string
  logoUrl?: string
  salesPhone?: string
  orderIndex?: number
  plan?: string
  isActive?: boolean
  products?: Product[]
}

export interface Provider extends ProviderBase {
  id: string
  createdAt?: string
  updatedAt?: string
}

export interface MutableProviderFormProps {
  onSubmit: (_formData: ProviderEditable) => void
  loading: boolean
  originalData?: Provider
}
