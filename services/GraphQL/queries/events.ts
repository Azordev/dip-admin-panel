import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
  query {
    events {
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

export const GET_EVENT_BY_ID = gql`
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
