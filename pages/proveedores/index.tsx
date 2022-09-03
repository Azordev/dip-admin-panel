import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'

import EmptyList from '@/components/EmptyList'
import PaginatedSuppliers from '@/components/PaginatedSuppliers'
import { Provider } from '@/services/GraphQL/providers/types'
import ProvidersList from '@/views/Providers/List'
import ClientOnly from '@/views/Shared/ClientOnly'

import { getProviders } from 'controllers/providers'

interface PageProps {
  providers: Provider[]
}

const Providers: NextPage<PageProps> = ({ providers }) => {
  const [CurrentPage, setCurrentPage] = useState(1)
  const ProvidersPerPage = 3
  const indexOfLastProvider = CurrentPage * ProvidersPerPage
  const indexOfFirstProvider = indexOfLastProvider - ProvidersPerPage
  if (!providers || providers.length < 1) return <EmptyList text="La lista de proveedores esta vacía o es invalida." />
  return (
    <ClientOnly>
      <>
        <ProvidersList providers={providers} />
        <PaginatedSuppliers
          ProvidersPerPage={ProvidersPerPage}
          totalProvidersLength={providers.length}
          providers={providers}
          setCurrentPage={setCurrentPage}
          CurrentPage={CurrentPage}
          indexOfFirstProvider={indexOfFirstProvider}
          indexOfLastProvider={indexOfLastProvider}
        />
      </>
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
