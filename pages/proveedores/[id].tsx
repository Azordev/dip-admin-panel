import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import { ProviderEditable } from '@/services/GraphQL/providers/types'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

import { getProvider } from 'controllers/providers'

type PageProps = {
  provider: ProviderEditable
}

const Provider: NextPage<PageProps> = ({ provider }) => {
  const { query } = useRouter()

  if (!provider.products || provider.products.length < 1)
    return <EmptyList text="El proveedor esta vacío o es invalido." />
  return (
    <ClientOnly>
      <>
        <ListHeader
          createPath={`/productos/crear?provider=${query.id}&provider-url=${provider.logoUrl}`}
          createText="Añadir nuevo producto"
          logoUrl={provider.logoUrl}
          altLogo={provider.commercialName}
        />
        <ProductList products={provider.products} />
      </>
    </ClientOnly>
  )
}

export default Provider

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  const { provider } = await getProvider(id as string)

  return {
    props: {
      provider,
    },
  }
}
