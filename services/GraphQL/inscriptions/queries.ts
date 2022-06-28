import { gql } from '@apollo/client'

import { eventInfo } from '../events/types.d'
import { memberInfo } from '../users/types.d'

export const INSCRIPTIONS = gql`
  ${eventInfo}
  ${memberInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    inscriptions(
      limit: $limit
      offset: $offset
      where: { _or: [{ email: { _ilike: $query } }, { name: { _ilike: $query } }, { phone: { _ilike: $query } }] }
      order_by: { name: asc }
    ) {
      id
      member: attendee_member {
        ...MemberInfoFragment
      }
      event: event_information {
        ...EventInfoFragment
      }
      updatedAt: updated_at
    }
  }
`

export const INSCRIPTION_BY_ID = gql`
  ${eventInfo}
  ${memberInfo}
  query ($id: uuid!) {
    inscription: inscriptions_by_pk(id: $id) {
      id
      member: attendee_member {
        ...MemberInfoFragment
      }
      event: event_information {
        ...EventInfoFragment
      }
      updatedAt: updated_at
    }
  }
`
