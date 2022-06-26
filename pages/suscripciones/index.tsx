import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { SUBSCRIPTIONS } from '@/services/GraphQL/subscriptions/queries'
import { Subscription } from '@/services/GraphQL/subscriptions/types.d'
import ClientOnly from '@/views/Shared/ClientOnly'

const Subscriptions: NextPage = () => {
  const { push } = useRouter()
  const { data, loading, error: queryError } = useQuery(SUBSCRIPTIONS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!data) {
    return <h2>No hay suscripciones</h2>
  }

  if (queryError) {
    console.error(queryError)
    push('/')
  }

  return (
    <ClientOnly>
      <>
        <h1>Suscripciones</h1>

        <ul>
          {data.subscriptions.map((subscription: Subscription) => (
            <li key={subscription.id}>{subscription.id}</li>
          ))}
        </ul>
      </>
    </ClientOnly>
  )
}

export default Subscriptions
