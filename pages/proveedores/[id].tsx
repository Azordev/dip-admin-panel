import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_PROVIDER_BY_ID } from '../../services/GraphQL/queries/providers'
import ClientOnly from '../../views/Shared/ClientOnly'
import Image from '../../views/Shared/Image'

interface Provider {
  id: string
  commercial_name: string
  sales_email: string
  sales_phone: string
  address: string
  created_at: string
  updated_at: string
  avatar_url: string
}
const Provider: React.FC<{ provider: Provider }> = ({ provider }) => {
  return (
    <div>
      <ClientOnly>
        {provider && (
          <div>
            <Image src={provider.avatar_url} alt="avatar" />
            <h1>{provider.commercial_name}</h1>
            <p>{provider.sales_email}</p>
            <p>{provider.sales_phone}</p>
            <p>{provider.address}</p>
            <p>{provider.created_at}</p>
            <p>{provider.updated_at}</p>
          </div>
        )}
      </ClientOnly>
    </div>
  )
}

export default Provider

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PROVIDER_BY_ID,
  })

  return {
    props: {
      user: data.user,
    },
  }
}
