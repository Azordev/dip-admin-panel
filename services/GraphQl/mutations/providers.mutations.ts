import { gql } from '@apollo/client'

const CREATE_PROVIDER = gql`
  mutation createProvider(
    $commercial_name: String!
    $address: String!
    $sales_phone: String!
    $b2b_phone: String!
    $sales_email: String!
    $b2b_email: String!
    $legal_name: String!
    $details: String!
    $latitude: String!
    $longitude: String!
    $is_active: Boolean!
    $logo_url: String!
  ) {
    insert_providers(
      objects: {
        commercial_name: $commercial_name
        address: $address
        sales_phone: $sales_phone
        b2b_phone: $b2b_phone
        sales_email: $sales_email
        b2b_email: $b2b_email
        legal_name: $legal_name
        details: $details
        latitude: $latitude
        longitude: $longitude
        is_active: $is_active
        logo_url: $logo_url
      }
    ) {
      returning {
        id
        commercial_name
      }
    }
  }
`

export { CREATE_PROVIDER }
