import { gql } from '@apollo/client'

import { categoryInfo } from './types.d'

export const CATEGORIES = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    categories(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
      where: { _or: [{ description: { _ilike: $query } }, { name: { _ilike: $query } }] }
    ) {
      id
      ${categoryInfo}
      created_at
      updated_at
      products: products_aggregate {
        stats: aggregate {
          count
        }
      }
    }
  }
`

export const CATEGORY_BY_ID = gql`
  query ($id: uuid!) {
    category: categories_by_pk(id: $id) {
      id      
      ${categoryInfo}
      created_at
      updated_at
      products: products_aggregate {
        stats: aggregate {
          count
        }
      }
    }
  }
`
