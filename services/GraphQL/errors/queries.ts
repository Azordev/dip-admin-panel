import { gql } from '@apollo/client'

import { errorInfo } from './types'

export const ERRORS = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    errors: frontend_errors(
      limit: $limit
      offset: $offset
      order_by: { created_at: desc }
      where: {
        _or: [
          { code_location: { _ilike: $query } },
          { error: { _ilike: $query } },
          { user: { member_code: { _ilike: $query } } }
        ]
      }
    ) {
      id
      ${errorInfo}
      created_at
      updated_at
      user {
        id
        member_code
      }
    }
  }
`
