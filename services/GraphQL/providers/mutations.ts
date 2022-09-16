import { gql } from '@apollo/client'

export const CREATE_PROVIDER = gql`
  mutation (
    $commercialName: String
    $address: String
    $salesPhone: String
    $b2bPhone: String
    $salesEmail: String
    $b2bEmail: String
    $legalName: String
    $details: String
    $logoUrl: String
    $userId: uuid
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
        logo_url: $logoUrl
        user_id: $userId
        is_active: true
      }
    ) {
      isActive: is_active
      id
    }
  }
`

export const UPDATE_PROVIDER = gql`
  mutation (
    $userId: uuid!
    $providerId: uuid!
    $memberCode: String!
    $commercialName: String!
    $salesEmail: String!
    $password: String!
  ) {
    update_users_by_pk(pk_columns: { id: $userId }, _set: { member_code: $memberCode, password: $password }) {
      is_active
    }
    update_providers_by_pk(
      pk_columns: { id: $providerId }
      _set: { commercial_name: $commercialName, b2b_email: $salesEmail }
    ) {
      is_active
    }
  }
`

export const TOGGLE_PROVIDER = gql`
  mutation ($id: uuid!, $isActive: Boolean) {
    provider: update_providers_by_pk(pk_columns: { id: $id }, _set: { is_active: $isActive }) {
      isActive: is_active
    }
  }
`
