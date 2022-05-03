import { gql } from '@apollo/client'

export const INSERT_USER = gql`
  mutation ($username: String!, $password: String!, $type: String!) {
    insert_users_one(object: { username: $username, password: $password, type: $type, is_active: true }) {
      is_active
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($id: uuid!, $username: String, $password: String, $type: String) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { username: $username, password: $password, type: $type }) {
      is_active
    }
  }
`

export const HIDE_USER = gql`
  mutation ($id: uuid!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      is_active
    }
  }
`
