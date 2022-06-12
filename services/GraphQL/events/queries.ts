import { gql } from '@apollo/client'

export const EVENTS = gql`
  query ($query: String, $limit: Int = 24, $offset: Int = 0) {
    events(
      limit: $limit
      offset: $offset
      where: {
        _or: [{ description: { _ilike: $query } }, { details: { _ilike: $query } }, { title: { _ilike: $query } }]
      }
      order_by: { title: asc }
    ) {
      id
      title
      description
      date
      type
      image_url
      requirements_url
    }
  }
`

export const EVENT_BY_ID = gql`
  query ($id: uuid!) {
    event: events_by_pk(id: $id) {
      id
      title
      description
      date
      type
      image_url
      requirements_url
    }
  }
`
