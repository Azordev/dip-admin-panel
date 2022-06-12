import { gql } from '@apollo/client'

export const PROVIDERS = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    providers(
      order_by: { commercial_name: asc }
      where: { _or: [{ commercial_name: { _ilike: $query } }, { legal_name: { _ilike: $query } }] }
      limit: $limit
      offset: $offset
    ) {
      id
      commercial_name
      address
      sales_phone
      b2b_phone
      sales_email
      b2b_email
      legal_name
      details
      is_active
      logo_url
    }
  }
`

export const PROVIDER_BY_ID = gql`
  query ($id: uuid!) {
    provider: providers_by_pk(id: $id) {
      commercial_name
      address
      sales_phone
      b2b_phone
      sales_email
      b2b_email
      legal_name
      details
      is_active
      logo_url
    }
  }
`
