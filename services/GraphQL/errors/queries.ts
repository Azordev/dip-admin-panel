import { gql } from '@apollo/client'

import { usersInfo } from '../users/types.d'
import { errorInfo } from './types.d'

export const ERRORS = gql`
  ${usersInfo}
  ${errorInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    errors: frontend_errors(
      limit: $limit
      offset: $offset
      order_by: { created_at: desc }
      where: {
        _or: [
          { code_location: { _ilike: $query } }
          { error: { _ilike: $query } }
          { user: { member_code: { _ilike: $query } } }
        ]
      }
    ) {
      id
      ...ErrorInfoFragment
      created_at
      updated_at
      user {
        ...UserInfoFragment
      }
    }
  }
`
