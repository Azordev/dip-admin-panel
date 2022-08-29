import { gql } from '@apollo/client'

import { providerInfo } from './types.d'

export const PROVIDERS = gql`
  ${providerInfo}
  query ($query: String = "%%", $limit: Int = 24, $offset: Int = 0) {
    providers(
      order_by: { commercial_name: asc }
      where: { _or: [{ commercial_name: { _ilike: $query } }, { legal_name: { _ilike: $query } }] }
      limit: $limit
      offset: $offset
    ) {
      id
      ...ProviderInfoFragment
    }
  }
`

export const PROVIDER_BY_ID = gql`
  ${providerInfo}
  query ($id: uuid!) {
    provider: providers_by_pk(id: $id) {
      ...ProviderInfoFragment
      createdAt: created_at
      updatedAt: updated_at
      products {
        id
        basePriceSol: base_price_sol
        name
        imageUrl: image_url
      }
    }
  }
`
