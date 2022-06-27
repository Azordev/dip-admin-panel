import { gql } from '@apollo/client'

import { eventInfo } from '../events/types.d'
import { subscriptionInfo } from '../subscriptions/types.d'
import { memberInfo, usersInfo } from './types.d'

export const USER_SESSION = gql`
  query login($password: String!, $memberCode: String!) {
    users(
      where: {
        _and: [
          {type: { _in: ["ADMIN", "SUPER_ADMIN", "TEST_ADMIN"] }},
          {member_code: { _eq: $memberCode }},
          {password: { _eq: $password }}
        ]
      }
    ) {
      ${usersInfo}
      memberInfo: member_info {
        ${memberInfo}
      }
    }
  }
`

export const USER_BY_ID = gql`
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
      isActive
      ${usersInfo}
      memberInfo: member_info {
        ${memberInfo}
      }
    }
  }
`

export const USERS = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    users(limit: $limit, offset: $offset, order_by: {member_code: asc}, where: {member_code: {_ilike: $query}}) {
      ${usersInfo}
      memberInfo: member_info {
        ${memberInfo}
      }
      frontendErrors: frontend_errors_aggregate {
        stats: aggregate {
          count
        }
      }
    }
  }
`

export const MEMBERS = gql`
  query {
    members {
      ${memberInfo}
      eventsInscribed: events_inscribed {
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

export const MEMBER_BY_ID = gql`
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
