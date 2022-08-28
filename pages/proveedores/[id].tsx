import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import Loading from '@/components/Loading'
import ProviderCard from '@/components/ProviderCard'
import useLogger from '@/hooks/useLogger'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import { Provider as ProviderFields } from '@/services/GraphQL/providers/types'
import ClientOnly from '@/views/Shared/ClientOnly'

import styles from '../../components/ProviderCard/ProviderCard.module.scss'

const Provider: NextPage = () => {
  const { push, query } = useRouter()
  const {
    data,
    loading,
    error: queryError,
  } = useQuery<{ provider: ProviderFields }>(PROVIDER_BY_ID, {
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
      <>
        <ListHeader
          createPath={`/productos/crear?provider=${query.id}&provider-url=${data.provider.logoUrl}`}
          createText="Añadir nuevo producto"
          logoUrl={data.provider.logoUrl}
          altLogo={data.provider.commercialName}
        />
        <div className={styles['card-container']}>
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
          <ProviderCard provider={data.provider} />
        </div>
      </>
    </ClientOnly>
  )
}

export default Provider
