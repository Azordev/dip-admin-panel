import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import ClientOnly from '@/views/Shared/ClientOnly'
import { INSCRIPTIONS } from '@/services/GraphQL/inscriptions/queries'
import { Inscription } from '@/services/GraphQL/inscriptions/types'

const Inscriptions: NextPage = () => {
  const { data, loading, error } = useQuery(INSCRIPTIONS)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.error(error)
  }

  return (
    <ClientOnly>
      <>
        <h1>Inscriptions</h1>
        <ul>
          {data?.inscripciones.map((inscription: Inscription) => (
            <li key={inscription.id}>{inscription.id}</li>
          ))}
        </ul>
      </>
    </ClientOnly>
  )
}

export default Inscriptions
