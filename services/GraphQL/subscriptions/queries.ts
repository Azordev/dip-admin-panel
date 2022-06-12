import { gql } from '@apollo/client'

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
      status
      type
      expiration
      details
      created_at
      updated_at
      payment {
        id
        is_confirmed
        in_review
        is_reversed
        quantity
        reference_details
        reference_id
        total_price
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
