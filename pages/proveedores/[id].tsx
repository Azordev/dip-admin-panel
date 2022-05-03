import { GetStaticPaths } from 'next'
import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_PROVIDER_BY_ID } from '../../services/GraphQL/queries/providers'
import { Provider as ProviderProps } from '../../services/GraphQL/types/providers'
import ClientOnly from '../../views/Shared/ClientOnly'
import Image from '../../views/Shared/Image'

const Provider: React.FC<{ provider: ProviderProps }> = ({ provider }) => (
  <div>
    <ClientOnly>
      {provider && (
        <div>
          {provider.avatar_url && <Image src={provider.avatar_url} alt="avatar" />}
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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { data } = await client.query({
    query: GET_PROVIDER_BY_ID,
  })

  const paths =
    data.providers?.map((provider: ProviderProps) => ({
      params: {
        id: provider.id.toString(),
      },
    })) || []
  return {
    paths,
    fallback: 'blocking', // indicates the type of fallback
  }
}
