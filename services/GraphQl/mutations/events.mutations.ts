import { gql } from '@apollo/client'

const CREATE_EVENT = gql`
  mutation createEvent($title: String!, $description: String!, $date: String!, $type: String!) {
    insert_events(objects: { date: $date, title: $title, description: $description, type: $type }) {
      affected_rows
    }
  }
`

export { CREATE_EVENT }
