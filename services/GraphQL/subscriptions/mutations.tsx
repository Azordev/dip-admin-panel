import { gql } from '@apollo/client'

export const CREATE_SUBSCRIPTION = gql`
  mutation ($memberId: uuid, $expiration: String) {
    insert_subscriptions_one(object: { member_id: $memberId, expiration: $expiration }) {
      id
    }
  }
`
