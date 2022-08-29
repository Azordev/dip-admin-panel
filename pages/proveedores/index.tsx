import { GetServerSideProps, NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import { Provider } from '@/services/GraphQL/providers/types'
import ProvidersList from '@/views/Providers/List'
import ClientOnly from '@/views/Shared/ClientOnly'

import { getProviders } from 'controllers/providers'

interface PageProps {
  providers: Provider[]
}

const Providers: NextPage<PageProps> = ({ providers }) => {
  if (!providers || providers.length < 1) return <EmptyList text="La lista de proveedores esta vacía o es invalida." />
  return (
    <ClientOnly>
      <ProvidersList providers={providers} />
    </ClientOnly>
  )
}

export default Providers

export const getServerSideProps: GetServerSideProps = async () => {
  const { providers } = await getProviders()

  return {
    props: {
      providers: providers || [],
    },
  }
}
