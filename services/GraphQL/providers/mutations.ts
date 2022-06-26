import { gql } from '@apollo/client'

export const CREATE_PROVIDER = gql`
  mutation (
    $commercialName: String!
    $address: String
    $salesPhone: String
    $b2bPhone: String!
    $salesEmail: String
    $b2bEmail: String!
    $legalName: String
    $details: String
    $isActive: Boolean
    $logoUrl: String
  ) {
    provider: insert_providers_one(
      object: {
        commercial_name: $commercialName
        address: $address
        sales_phone: $salesPhone
        b2b_phone: $b2bPhone
        sales_email: $salesEmail
        b2b_email: $b2bEmail
        legal_name: $legalName
        details: $details
        is_active: $isActive
        logo_url: $logoUrl
      }
    ) {
      isActive: is_active
    }
  }
`

// TODO: check if it needs more fields
export const UPDATE_PROVIDER = gql`
  mutation ($id: uuid!, $commercialName: String, $salesEmail: String, $salesPhone: String, $address: String) {
    provider: update_providers_by_pk(
      pk_columns: { id: $id }
      _set: { commercial_name: $commercialName, sales_email: $salesEmail, sales_phone: $salesPhone, address: $address }
    ) {
      isActive: is_active
    }
  }
`

export const DEACTIVATE_PROVIDER = gql`
  mutation ($id: uuid!) {
    provider: update_providers_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      isActive: is_active
    }
  }
`
