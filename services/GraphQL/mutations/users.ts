import { gql } from '@apollo/client'

export const INSERT_ADMIN = gql`
  mutation ($email: String!, $password: String, $avatar_url: String) {
    user: insert_users_one(object: { username: $email, password: $password, type: 'ADMIN', is_active: true, avatar_url: $avatar_url }) {
      id
      updated_at
    }
  }
`

export const INSERT_USER_MEMBER = gql`
  mutation ($username: String!, $password: String, $avatar_url: String) {
    user: insert_users_one(object: { username: $username, password: $password, type: 'MEMBER', is_active: true, avatar_url: $avatar_url }) {
      id
      updated_at
    }
  }
`

export const INSERT_MEMBER = gql`
  mutation ($first_names: String!, $last_names: String, $email: String!, $user_id: uuid!) {
    member: insert_members_one(
      object: { first_names: $first_names, last_names: $last_names, email: $email, user_id: $user_id }
    ) {
      updated_at
      user {
        id
      }
    }
  }
`

export const UPDATE_ADMIN = gql`
  mutation ($id: uuid!, $username: String, $password: String, $is_active: boolean, $avatar_url: String) {
    user: update_users_by_pk(
      pk_columns: { id: $id }
      _set: { username: $username, password: $password, is_active: $is_active, avatar_url: $avatar_url }
    ) {
      id
      is_active
    }
  }
`

export const UPDATE_USER_MEMBER = gql`
  mutation ($id: uuid!, $username: String, $password: String, $is_active: boolean, $avatar_url: String) {
    user: update_users_by_pk(
      pk_columns: { id: $id }
      _set: { username: $username, password: $password, is_active: $is_active, avatar_url: $avatar_url }
    ) {
      id
    }
  }
  mutation (
    $id: uuid!
    $first_names: String
    $last_names: String
    $email: String
    $contact_information: String
    $degree: String
  ) {
    member: update_members(
      where: { user_id: { _eq: $id } }
      _set: {
        first_names: $first_names
        last_names: $last_names
        email: $email
        contact_information: $contact_information
        degree: $degree
      }
    ) {
      affected_rows
    }
  }
`

export const DEACTIVATE_USER = gql`
  mutation ($id: uuid!) {
    user: update_users_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      is_active
    }
  }
`
