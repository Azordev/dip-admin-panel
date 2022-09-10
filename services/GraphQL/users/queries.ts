import { gql } from '@apollo/client'

import { eventInfo } from '../events/types.d'
import { memberInfo, providerInfo, usersInfo } from './types.d'

export const USER_SESSION = gql`
  ${usersInfo}
  ${memberInfo}
  ${providerInfo}
  query login($password: String!, $memberCode: String!) {
    users(
      where: {
        _and: [
          { type: { _in: ["ADMIN", "SUPER_ADMIN", "TEST_ADMIN", "PROVIDER"] } }
          { member_code: { _eq: $memberCode } }
          { password: { _eq: $password } }
        ]
      }
    ) {
      ...UserInfoFragment
      memberInfo: member_info {
        ...MemberInfoFragment
      }
      providerInfo: provider_info {
        ...ProviderInfoFragment
      }
    }
  }
`

export const USER_BY_ID = gql`
  ${memberInfo}
  ${usersInfo}
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
      ...UserInfoFragment
      isActive
      memberInfo: member_info {
        ...MemberInfoFragment
      }
    }
  }
`

export const USERS = gql`
  ${usersInfo}
  ${memberInfo}
  ${providerInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    users(limit: $limit, offset: $offset, order_by: { member_code: asc }, where: { member_code: { _ilike: $query } }) {
      ...UserInfoFragment
      memberInfo: member_info {
        ...MemberInfoFragment
      }
      providerInfo: provider_info {
        ...ProviderInfoFragment
      }
      frontendErrors: frontend_errors_aggregate {
        stats: aggregate {
          count
        }
      }
    }
  }
`

export const MEMBER_USERS = gql`
  ${usersInfo}
  ${memberInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    users(
      limit: $limit
      offset: $offset
      order_by: { member_code: asc }
      where: { member_code: { _ilike: $query }, type: { _eq: "MEMBER" } }
    ) {
      ...UserInfoFragment
      memberInfo: member_info {
        ...MemberInfoFragment
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
  ${usersInfo}
  ${memberInfo}
  query {
    members {
      ...MemberInfoFragment
      eventsInscribed: events_inscribed {
        event: event_information {
          ${eventInfo}
        }
      }
      user {
        ...UserInfoFragment
      }
    }
  }
`

export const MEMBER_BY_ID = gql`
  ${usersInfo}
  ${memberInfo}
  query ($id: uuid!) {
    member: members_by_pk(id: $id) {
      ...MemberInfoFragment
      events_inscribed {
        event: event_information {
          ${eventInfo}
        }
      }
      user {
        ...UserInfoFragment
      }
    }
  }
`
