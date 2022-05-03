import { gql } from '@apollo/client'

// create provider
export const CREATE_PROVIDER = gql`
  mutation ($commercial_name: String!, $sales_email: String!, $sales_phone: String!, $address: String!) {
    insert_providers_one(
      object: {
        commercial_name: $commercial_name
        sales_email: $sales_email
        sales_phone: $sales_phone
        address: $address
      }
    ) {
      affected_rows
    }
  }
`

// update provider
// TODO: check if it needs more fields
export const UPDATE_PROVIDER = gql`
  mutation ($id: String!, $commercial_name: String, $sales_email: String, $sales_phone: String, $address: String) {
    update_providers_by_pk(
      pk_columns: { id: $id }
      _set: {
        commercial_name: $commercial_name
        sales_email: $sales_email
        sales_phone: $sales_phone
        address: $address
      }
    ) {
      affected_rows
    }
  }
`

// hide provider
export const HIDE_PROVIDER = gql`
  mutation ($id: String!) {
    update_providers_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      affected_rows
    }
  }
`
