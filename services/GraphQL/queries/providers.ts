import { gql } from '@apollo/client'

export const GET_PROVIDERS = gql`
  query {
    providers {
      id
      commercial_name
      sales_email
      sales_phone
      address
      created_at
      updated_at
      avatar_url
    }
  }
`

// get providers per categories
export const GET_PROVIDERS_BY_CATEGORY = gql`
  query ($category_id: String!) {
    categories(where: { id: { _eq: $category_id } }) {
      providers {
        provider {
          id
          legal_name
          logo_url
        }
      }
    }
  }
`

export const GET_PROVIDER_BY_ID = gql`
  query ($id: String!) {
    provider(id: $id) {
      id
      name
      email
      phone
      address
      created_at
      updated_at
      avatar_url
    }
  }
`
