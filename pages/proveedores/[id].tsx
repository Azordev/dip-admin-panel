import { GetStaticPaths } from 'next'
import React from 'react'
import client from '../../services/GraphQL/client'
import { PROVIDERS, PROVIDER_BY_ID } from '../../services/GraphQL/providers/queries'
import { Provider as ProviderProps } from '../../services/GraphQL/providers/types'
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

type StaticProps = {
  params: ProviderProps
}

export async function getStaticProps({ params: { id } }: StaticProps) {
  const {
    data: { provider },
    errors,
  } = await client.query({
    query: PROVIDER_BY_ID,
    variables: {
      id,
    },
  })

  if (errors) {
    return {
      props: {
        event: null,
      },
    }
  }

  return {
    props: {
      provider,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const {
    data: { providers },
    errors,
  } = await client.query({
    query: PROVIDERS,
  })

  if (providers.length < 1 || errors) {
    return {
      paths: [],
      fallback: false,
    }
  }

  const paths =
    providers.map((provider: ProviderProps) => ({
      params: {
        id: provider.id?.toString(),
      },
    })) || []
  return {
    paths,
    fallback: false, // indicates the type of fallback
  }
}
