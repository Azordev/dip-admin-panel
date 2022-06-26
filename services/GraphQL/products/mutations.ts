import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation (
    $name: String = ""
    $description: String = ""
    $details: String = ""
    $available: numeric = 1
    $imageUrl: String = ""
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
        image_url: $imageUrl
        offer_discount: $offerDiscount
        provider_id: $providerId
        unit_system: $unitSystem
        with_offer: $withOffer
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
    $imageUrl: String = ""
    $offerDiscount: Int = 10
    $providerId: uuid = ""
    $unitSystem: String = ""
    $withOffer: Boolean = false
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        description: $description
        details: $details
        available: $available
        image_url: $imageUrl
        offer_discount: $offerDiscount
        provider_id: $providerId
        unit_system: $unitSystem
        with_offer: $withOffer
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
