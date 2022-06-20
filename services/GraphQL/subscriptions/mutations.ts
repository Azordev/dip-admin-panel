import { gql } from '@apollo/client'

export const UPDATE_SUBSCRIPTION = gql`
  mutation ($expiration: String, $status: String, $type: String, $details: String, $id: uuid!) {
    update_subscriptions(
      where: { id: { _eq: $id } }
      _set: { expiration: $expiration, status: $status, type: $type, details: $details }
    ) {
      affected_rows
    }
  }
`

export const DELETE_SUBSCRIPTION = gql`
  mutation ($id: uuid!) {
    subscription: delete_subscriptions_by_pk(id: $id) {
      id
    }
  }
`
