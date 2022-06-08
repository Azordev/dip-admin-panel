import { gql } from '@apollo/client'
import { eventInfo } from '../types/events.d'
import { subscriptionInfo } from '../types/payments.d'
import { usersInfo, memberInfo } from '../types/users.d'

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
      ${usersInfo}
      member_information {
        ${memberInfo}
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
      is_active
      ${usersInfo}
      member_information {
        ${memberInfo}
      }
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      is_active
      ${usersInfo}
    }
  }
`

export const GET_MEMBERS = gql`
  query {
    members {
      ${memberInfo}
      events_inscribed {
        event: event_information {
          ${eventInfo}
        }
      }
      subscriptions {
        ${subscriptionInfo}
      }
      user {
        ${usersInfo}
      }
    }
  }
`

export const GET_MEMBER_BY_ID = gql`
  query ($id: uuid!) {
    member: members_by_pk(id: $id) {
      ${memberInfo}
      events_inscribed {
        event: event_information {
          ${eventInfo}
        }
      }
      subscriptions {
        ${subscriptionInfo}
      }
      user {
        ${usersInfo}
      }
    }
  }
`
