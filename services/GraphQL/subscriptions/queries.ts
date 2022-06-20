import { gql } from '@apollo/client'
import { paymentInfo } from '../payments/types.d'
import { subscriptionInfo } from './types.d'

export const SUBSCRIPTIONS = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    subscriptions(
      limit: $limit
      offset: $offset
      order_by: { expiration: desc }
      where: {
        _or: [
          { type: { _ilike: $query } }
          { details: { _ilike: $query } }
          { member: { user: { member_code: { _ilike: $query } } } }
        ]
      }
    ) {
      id
      ${subscriptionInfo}
      created_at
      updated_at
      member {
        id
        email
        user {
          member_code
        }
      }
    }
  }
`

export const SUBSCRIPTION_BY_ID = gql`
  query ($id: uuid!) {
    subscription: subscriptions_by_pk(id: $id) {
      id
      ${subscriptionInfo}
      created_at
      updated_at
      payment {
        id
        ${paymentInfo}
        created_at
        updated_at
      }
      member {
        id
        email
        user {
          member_code
        }
      }
    }
  }
`
