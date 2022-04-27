import { gql } from '@apollo/client'

const GET_PROVIDERS = gql`
  query getProviders {
    providers {
      commercial_name
      address
      sales_phone
      b2b_phone
      sales_email
      b2b_email
      legal_name
      details
      latitude
      longitude
      is_active
      logo_url
    }
  }
`

export { GET_PROVIDERS }
