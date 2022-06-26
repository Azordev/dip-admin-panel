import { gql } from '@apollo/client'

export const providerInfo = gql`
  fragment ProviderInfoFragment on providers {
    commercialName: commercial_name
    address
    salesPhone: sales_phone
    b2bPhone: b2b_phone
    salesEmail: sales_email
    b2bEmail: b2b_email
    legalName: legal_name
    details
    isActive: is_active
    logoUrl: logo_url
  }
`

export interface ProviderBase {
  commercialName: string
  b2bEmail: string
  isActive: boolean
  avatarUrl?: string
  address?: string
  salesPhone?: string
  b2bPhone?: string
  salesEmail?: string
  legalName?: string
  details?: string
  logoUrl?: string
}

export interface ProviderEditable extends ProviderBase {
  commercialName?: string
  b2bEmail?: string
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
