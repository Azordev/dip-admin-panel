import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import useLogger from '@/hooks/useLogger'
import ClientOnly from '@/views/Shared/ClientOnly'
import { SUBSCRIPTION_BY_ID } from '@/services/GraphQL/subscriptions/queries'

const Subscription: NextPage = () => {
  const { push } = useRouter()
  const { error } = useLogger()

  const { data, loading, error: queryError } = useQuery<{ subscription: { id: string } }>(SUBSCRIPTION_BY_ID)

  if (queryError) {
    error(queryError, 'pages/suscripciones/[id].tsx', 'useQuery(subscription)', 'UNEXPECTED')
    push('/')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>{data && data !== undefined ? <p>{data.subscription.id}</p> : <></>}</ClientOnly>
    </div>
  )
}

export default Subscription
