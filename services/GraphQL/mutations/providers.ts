import { gql } from '@apollo/client'

export const INSERT_PROVIDER = gql`
  mutation (
    $commercial_name: String!
    $address: String
    $sales_phone: String
    $b2b_phone: String!
    $sales_email: String
    $b2b_email: String!
    $legal_name: String
    $details: String
    $is_active: Boolean
    $logo_url: String
  ) {
    provider: insert_providers_one(
      object: {
        commercial_name: $commercial_name
        address: $address
        sales_phone: $sales_phone
        b2b_phone: $b2b_phone
        sales_email: $sales_email
        b2b_email: $b2b_email
        legal_name: $legal_name
        details: $details
        is_active: $is_active
        logo_url: $logo_url
      }
    ) {
      is_active
    }
  }
`

// TODO: check if it needs more fields
export const UPDATE_PROVIDER = gql`
  mutation ($id: uuid!, $commercial_name: String, $sales_email: String, $sales_phone: String, $address: String) {
    provider: update_providers_by_pk(
      pk_columns: { id: $id }
      _set: {
        commercial_name: $commercial_name
        sales_email: $sales_email
        sales_phone: $sales_phone
        address: $address
      }
    ) {
      is_active
    }
  }
`

export const HIDE_PROVIDER = gql`
  mutation ($id: uuid!) {
    provider: update_providers_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      is_active
    }
  }
`
