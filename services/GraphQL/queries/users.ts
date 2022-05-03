import { gql } from '@apollo/client'

export const GET_USER_SESSION = gql`
  query login($password: String = "", $username: String = "") {
    users(where: { password: { _eq: $password }, username: { _eq: $username } }) {
      username
      type
      is_active
      id
      created_at
      avatar_url
    }
  }
`

export const GET_USER_BY_ID = gql`
  query ($id: String!) {
    user(id: $id) {
      username
      type
      is_active
      id
      created_at
      avatar_url
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      username
      type
      password
      is_active
      id
      created_at
      avatar_url
    }
  }
`
