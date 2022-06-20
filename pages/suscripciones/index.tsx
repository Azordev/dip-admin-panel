import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import ClientOnly from '@/views/Shared/ClientOnly'
import { SUBSCRIPTIONS } from '@/services/GraphQL/subscriptions/queries'
import { Subscription } from '@/services/GraphQL/subscriptions/types.d'

const Subscriptions: NextPage = () => {
  const { push } = useRouter()
  const { data, loading, error } = useQuery(SUBSCRIPTIONS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!data) {
    return <h2>No hay suscripciones</h2>
  }

  if (error) {
    console.error(error)
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
