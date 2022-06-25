import { gql } from '@apollo/client'

import { categoryInfo } from './types.d'

export const CREATE_CATEGORY = gql`
  mutation ($name: String!, $description: String, $badgeUrl: String) {
    category: insert_categories_one(
      object: { name: $name, description: $description, badge_url: $badgeUrl, is_active: true }
    ) {
      ${categoryInfo}
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation ($id: uuid!, $name: String, $description: String, $badgeUrl: String, $isActive: Boolean) {
    category: update_categories_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description, badge_url: $badgeUrl, is_active: $isActive }
    ) {
      id
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation ($id: uuid!) {
    category: delete_categories_by_pk(id: $id) {
      id
    }
  }
`
