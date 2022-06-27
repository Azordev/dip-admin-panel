import { gql } from '@apollo/client'

import { categoryInfo } from './types.d'

export const CATEGORIES = gql`
  ${categoryInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    categories(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
      where: { _or: [{ description: { _ilike: $query } }, { name: { _ilike: $query } }] }
    ) {
      id
      ...CategoryInfoFragment
      createdAt: created_at
      updatedAt: updated_at
      products: products_aggregate {
        stats: aggregate {
          count
        }
      }
    }
  }
`

export const CATEGORY_BY_ID = gql`
  ${categoryInfo}
  query ($id: uuid!) {
    category: categories_by_pk(id: $id) {
      id
      ...CategoryInfoFragment
      createdAt: created_at
      updatedAt: updated_at
      products: products_aggregate {
        stats: aggregate {
          count
        }
      }
    }
  }
`
