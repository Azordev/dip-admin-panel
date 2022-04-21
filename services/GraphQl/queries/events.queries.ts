import { gql } from '@apollo/client'

const GET_EVENTS = gql`
  query Events {
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
