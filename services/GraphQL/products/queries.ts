import { gql } from '@apollo/client'
import { productInfo } from './types.d'

export const PRODUCTS = gql`
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    products(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
      where: { _or: [{ description: { _ilike: $query } }, { name: { _ilike: $query } }] }
    ) {
      id
      ${productInfo}
      product_categories_aggregate {
        aggregate {
          count
        }
      }
      created_at
      updated_at
    }
  }
`

export const PRODUCT_BY_ID = gql`
  query ($id: uuid!) {
    product: products_by_pk(id: $id) {
      id
      ${productInfo}
      product_categories_aggregate {
        aggregate {
          count
        }
      }
      created_at
      updated_at
    }
  }
`
