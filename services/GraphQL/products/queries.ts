import { gql } from '@apollo/client'

import { productInfo } from './types.d'

export const PRODUCTS = gql`
  ${productInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    products(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
      where: { _or: [{ description: { _ilike: $query } }, { name: { _ilike: $query } }] }
    ) {
      id
      ...ProductInfoFragment
      categories: product_categories_aggregate {
        stats: aggregate {
          count
        }
      }
      createdAt: created_at
      updatedAt: updated_at
    }
  }
`

export const PRODUCT_BY_ID = gql`
  ${productInfo}
  query ($id: uuid!) {
    product: products_by_pk(id: $id) {
      id
      ...ProductInfoFragment
      categories: product_categories_aggregate {
        stats: aggregate {
          count
        }
      }
      createdAt: created_at
      updatedAt: updated_at
    }
  }
`
