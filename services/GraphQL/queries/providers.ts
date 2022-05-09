import { gql } from '@apollo/client'

export const GET_PROVIDERS = gql`
  query {
    providers {
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

export const GET_PROVIDERS_BY_CATEGORY = gql`
  query ($category_id: uuid!) {
    providers: categories_by_pk(id: $category_id) {
      provider_categories {
        provider {
          commercial_name
          id
          logo_url
        }
      }
    }
  }
`

export const GET_PROVIDER_BY_ID = gql`
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
      categories {
        category {
          id
          name
          is_active
        }
      }
    }
  }
`
