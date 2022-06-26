import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { PROVIDERS } from '@/services/GraphQL/providers/queries'
import ProvidersList from '@/views/Providers/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Providers: NextPage = () => {
  const { data, loading, error: queryError } = useQuery(PROVIDERS)
  const { error: logError } = useLogger()

  if (queryError) logError(queryError, 'pages/proveedores/index.tsx')

  if (loading) return <Loading />
  if (!data || !data.providers) return <EmptyList text="La lista de proveedores esta vacía o es invalida." />
  return (
    <ClientOnly>
      <ProvidersList providers={data.providers} />
    </ClientOnly>
  )
}

export default Providers
