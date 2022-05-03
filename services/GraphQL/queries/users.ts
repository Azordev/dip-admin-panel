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
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
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

export const GET_MEMBERS = gql`
  query {
    members {
      avatar_url
      contact_information
      created_at
      email
      events_inscribed {
        event_information {
          date
          image_url
          is_active
          title
        }
      }
      first_names
      id
      last_names
      user_id
      updated_at
      subscriptions {
        id
        expiration
        created_at
        details
        status
        type
        updated_at
      }
    }
  }
`

export const GET_MEMBER_BY_ID = gql`
  query ($id: uuid!) {
    member: members_by_pk(id: $id) {
      avatar_url
      contact_information
      created_at
      email
      events_inscribed {
        event_information {
          date
          image_url
          is_active
          title
        }
      }
      first_names
      id
      last_names
      user_id
      updated_at
      subscriptions {
        id
        expiration
        created_at
        details
        status
        type
        updated_at
      }
    }
  }
`
