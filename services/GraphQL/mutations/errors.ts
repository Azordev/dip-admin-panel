import { gql } from '@apollo/client'

export const INSERT_ERROR = gql`
  mutation ($codeLocation: String, $error: String, $origin: String, $type: String) {
    insert_frontend_errors_one(object: { code_location: $codeLocation, error: $error, origin: $origin, type: $type }) {
      id
    }
  }
`
