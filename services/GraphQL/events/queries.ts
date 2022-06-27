import { gql } from '@apollo/client'

import { eventInfo } from './types.d'

export const EVENTS = gql`
  ${eventInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    events(
      limit: $limit
      offset: $offset
      where: {
        _or: [{ description: { _ilike: $query } }, { details: { _ilike: $query } }, { title: { _ilike: $query } }]
      }
      order_by: { title: asc }
    ) {
      ...EventInfoFragment
    }
  }
`

export const EVENT_BY_ID = gql`
  ${eventInfo}
  query ($id: uuid!) {
    event: events_by_pk(id: $id) {
      ...EventInfoFragment
    }
  }
`
