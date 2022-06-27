import { gql } from '@apollo/client'

export const providerInfo = gql`
  fragment ProviderInfoFragment on providers {
    commercialName: commercial_name
    isActive: is_active
    logoUrl: logo_url
    salesPhone: sales_phone # use for whatsapp number
    plan
    orderIndex: order_index
  }
`

export interface ProviderBase {
  commercialName: string
  isActive: boolean
  logoUrl: string
  salesPhone: string
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
