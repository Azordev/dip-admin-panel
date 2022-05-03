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
  query ($id: String!) {
    event(id: $id) {
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
