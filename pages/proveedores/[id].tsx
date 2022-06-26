import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import ProviderDetail from '@/views/Providers/Detail'
import ClientOnly from '@/views/Shared/ClientOnly'

const Provider: NextPage = () => {
  const { push, query } = useRouter()
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(PROVIDER_BY_ID, {
    variables: {
      id: query.id,
    },
  })
  const { error: LogError } = useLogger()

  if (queryError) {
    LogError(queryError, 'Provider.tsx', 'useQuery(PROVIDER_BY_ID)', 'UNEXPECTED')
    push('/proveedores')
  }

  if (loading) return <Loading />
  if (!data || !data.provider) return <EmptyList text="El proveedor esta vacío o es invalido." />
  return (
    <ClientOnly>
      <ProviderDetail provider={data.provider} />
    </ClientOnly>
  )
}

export default Provider
