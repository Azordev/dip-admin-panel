import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import { Provider as ProviderFields } from '@/services/GraphQL/providers/types'
import ClientOnly from '@/views/Shared/ClientOnly'
import Image from '@/views/Shared/Image'
import useLogger from '@/hooks/useLogger'

const Provider: NextPage = () => {
  const { data: provider, loading, error } = useQuery<ProviderFields>(PROVIDER_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (error) {
    LogError(error, 'Provider.tsx', 'useQuery(PROVIDER_BY_ID)', 'UNEXPECTED')
    push('/proveedores')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>
        {typeof provider !== undefined && provider ? (
          <div>
            {provider.avatar_url && <Image src={provider.avatar_url} alt="avatar" />}
            <h1>{provider.commercial_name}</h1>
            <p>{provider.sales_email}</p>
            <p>{provider.sales_phone}</p>
            <p>{provider.address}</p>
            <p>{provider.created_at}</p>
            <p>{provider.updated_at}</p>
          </div>
        ) : (
          <></>
        )}
      </ClientOnly>
    </div>
  )
}

export default Provider
