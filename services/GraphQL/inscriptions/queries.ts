import { gql } from '@apollo/client'

export const INSCRIPTIONS = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    inscriptions(
      limit: $limit
      offset: $offset
      where: { _or: [{ email: { _ilike: $query } }, { name: { _ilike: $query } }, { phone: { _ilike: $query } }] }
      order_by: { name: asc }
    ) {
      id
      attendee_member {
        first_names
        last_names
        id
        email
      }
      event_information {
        id
        date
        is_active
        title
        type
      }
      updated_at
    }
  }
`

export const INSCRIPTION_BY_ID = gql`
  query ($id: uuid!) {
    inscription: inscriptions_by_pk(id: $id) {
      id
      attendee_member {
        first_names
        last_names
        id
        email
      }
      event_information {
        id
        date
        is_active
        title
        type
      }
      updated_at
    }
  }
`
