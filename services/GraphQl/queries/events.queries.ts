import { gql } from '@apollo/client'

const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      description
      date
      type
    }
  }
`

export { GET_EVENTS }
