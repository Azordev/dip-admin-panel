import { gql } from '@apollo/client'
import { usersInfoFragment, memberInfoFragment } from '../types/users.d'

export const GET_USER_SESSION = gql`
  query login($password: String!, $memberCode: String!) {
    users(
      where: {
        _and: {
          type: { _in: ["ADMIN", "SUPER_ADMIN", "TEST_ADMIN"] }
          member_code: { _eq: $memberCode }
          password: { _eq: $password }
          is_active: { _eq: true }
        }
      }
    ) {
      ...usersInfo
      member_information {
        ...memberInfo
      }
    }
  }
  ${usersInfoFragment}
  ${memberInfoFragment}
`

export const GET_USER_BY_ID = gql`
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
      is_active
      ...usersInfo
      member_information {
        ...memberInfo
      }
    }
  }
  ${usersInfoFragment}
  ${memberInfoFragment}
`

export const GET_USERS = gql`
  query {
    users {
      is_active
      ...usersInfo
    }
  }
  ${usersInfoFragment}
`

export const GET_MEMBERS = gql`
  query {
    members {
      ...memberInfo
      events_inscribed {
        event_information {
          date
          image_url
          is_active
          title
        }
      }
      subscriptions {
        id
        expiration
        details
        status
        type
      }
      user {
        ...usersInfo
      }
    }
  }
  ${usersInfoFragment}
  ${memberInfoFragment}
`

export const GET_MEMBER_BY_ID = gql`
  query ($id: uuid!) {
    member: members_by_pk(id: $id) {
      ...memberInfo
      events_inscribed {
        event_information {
          id
          date
          image_url
          is_active
          title
        }
      }
      subscriptions {
        id
        expiration
        created_at
        details
        status
        type
        updated_at
      }
      user {
        ...usersInfo
      }
    }
  }
  ${usersInfoFragment}
  ${memberInfoFragment}
`
