import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation (
    $name: String = ""
    $description: String = ""
    $details: String = ""
    $available: numeric = 1
    $image_url: String = ""
    $offer_discount: Int = 10
    $provider_id: uuid = ""
    $unit_system: String = ""
    $with_offer: Boolean = false
  ) {
    insert_products_one(
      object: {
        name: $name
        description: $description
        details: $details
        available: $available
        image_url: $image_url
        offer_discount: $offer_discount
        provider_id: $provider_id
        unit_system: $unit_system
        with_offer: $with_offer
      }
    ) {
      id
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation (
    $id: uuid!
    $name: String = ""
    $description: String = ""
    $details: String = ""
    $available: numeric = 1
    $image_url: String = ""
    $offer_discount: Int = 10
    $provider_id: uuid = ""
    $unit_system: String = ""
    $with_offer: Boolean = false
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        description: $description
        details: $details
        available: $available
        image_url: $image_url
        offer_discount: $offer_discount
        provider_id: $provider_id
        unit_system: $unit_system
        with_offer: $with_offer
      }
    ) {
      id
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation ($id: uuid!) {
    delete_products_by_pk(pk_columns: { id: $id }) {
      id
    }
  }
`

export const CREATE_PRODUCT_CATEGORY = gql`
  mutation ($product_id: uuid!, $category_id: uuid!) {
    insert_product_categories_one(object: { product_id: $product_id, category_id: $category_id }) {
      id
    }
  }
`

export const DELETE_PRODUCT_CATEGORY = gql`
  mutation ($product_id: uuid!, $category_id: uuid!) {
    delete_product_categories_by_pk(pk_columns: { product_id: $product_id, category_id: $category_id }) {
      id
    }
  }
`
