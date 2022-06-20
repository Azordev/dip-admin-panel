import { gql } from '@apollo/client'

import { categoryInfo } from './types.d'

export const CREATE_CATEGORY = gql`
  mutation ($name: String!, $description: String, $badge_url: String) {
    category: insert_categories_one(
      object: { name: $name, description: $description, badge_url: $badge_url, is_active: true }
    ) {
      ${categoryInfo}
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation ($id: uuid!, $name: String, $description: String, $badge_url: String, $is_active: Boolean) {
    category: update_categories_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description, badge_url: $badge_url, is_active: $is_active }
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
