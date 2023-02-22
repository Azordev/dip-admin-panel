import { gql } from '@apollo/client'

export const CREATE_ADMIN = gql`
  mutation ($memberCode: String!, $password: String, $avatarUrl: String) {
    user: insert_users_one(
      object: { member_code: $memberCode, password: $password, type: "ADMIN", is_active: true, avatar_url: $avatarUrl }
    ) {
      id
      updatedAt: updated_at
    }
  }
`

// This creates also the member
export const CREATE_USER_MEMBER = gql`
  mutation (
    $memberCode: String!
    $password: String
    $avatarUrl: String
    $type: String
    $position: String
    $isActive: Boolean
  ) {
    user: insert_users_one(
      object: {
        member_code: $memberCode
        password: $password
        type: $type
        is_active: $isActive
        avatar_url: $avatarUrl
        position: $position
      }
    ) {
      id
      updatedAt: updated_at
    }
  }
`

export const CREATE_PROVIDER_USER = gql`
  mutation ($memberCode: String!, $password: String, $avatarUrl: String) {
    user: insert_users_one(
      object: {
        member_code: $memberCode
        password: $password
        type: "PROVIDER"
        is_active: true
        avatar_url: $avatarUrl
        position: "PROVIDER"
      }
    ) {
      id
      updatedAt: updated_at
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($id: uuid!, $memberCode: String, $password: String, $isActive: Boolean, $avatarUrl: String, $type: String) {
    user: update_users_by_pk(
      pk_columns: { id: $id }
      _set: { member_code: $memberCode, password: $password, is_active: $isActive, avatar_url: $avatarUrl, type: $type }
    ) {
      id
    }
  }
`

export const CREATE_MEMBER = gql`
  mutation ($email: String, $userId: uuid, $firstNames: String, $lastNames: String, $startDate: date) {
    member: insert_members_one(
      object: {
        email: $email
        user_id: $userId
        first_names: $firstNames
        last_names: $lastNames
        start_date: $startDate
      }
    ) {
      id
    }
  }
`

export const UPDATE_MEMBER = gql`
  mutation (
    $memberId: uuid!
    $memberCode: String!
    $password: String!
    $userId: uuid!
    $firstNames: String!
    $lastNames: String!
    $email: String!
    $startDate: date!
  ) {
    update_members_by_pk(
      pk_columns: { id: $memberId }
      _set: { first_names: $firstNames, last_names: $lastNames, email: $email, start_date: $startDate }
    ) {
      updated_at
    }
    update_users_by_pk(pk_columns: { id: $userId }, _set: { member_code: $memberCode, password: $password }) {
      is_active
    }
  }
`

export const TOGGLE_USER = gql`
  mutation ($id: uuid!, $isActive: Boolean) {
    user: update_users_by_pk(pk_columns: { id: $id }, _set: { is_active: $isActive }) {
      isActive: is_active
    }
  }
`

export const DELETE_MEMBER = gql`
  mutation ($id: uuid!) {
    member: delete_members_by_pk(id: $id) {
      userId: user_id
    }
  }
`

export const DELETE_SUBSCRIPTION = gql`
  mutation ($id: uuid!) {
    delete_subscriptions(where: { member_id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export const DELETE_USER = gql`
  mutation ($id: uuid!) {
    user: delete_users_by_pk(id: $id) {
      id
    }
  }
`
