import { gql } from '@apollo/client'

export const errorInfo = gql`
  fragment ErrorInfoFragment on frontend_errors {
    origin
    type
    error
    codeLocation: code_location
  }
`
