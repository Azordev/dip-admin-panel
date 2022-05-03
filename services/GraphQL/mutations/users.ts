import { gql } from '@apollo/client'

// create user
export const CREATE_USER = gql`
  mutation ($username: String!, $password: String!, $email: String!, $type: String!) {
    insert_users_one(
      object: { username: $username, password: $password, email: $email, type: $type, is_active: true }
    ) {
      affected_rows
    }
  }
`

// update user
export const UPDATE_USER = gql`
  mutation ($id: String!, $username: String, $password: String, $email: String, $type: String) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { username: $username, password: $password, email: $email, type: $type }
    ) {
      affected_rows
    }
  }
`

// hide user
export const HIDE_USER = gql`
  mutation ($id: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      affected_rows
    }
  }
`
