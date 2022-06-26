import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyItem from '@/components/EmptyItem'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { INSCRIPTION_BY_ID } from '@/services/GraphQL/inscriptions/queries'
import InscriptionDetail from '@/views/Inscriptions/Detail'
import ClientOnly from '@/views/Shared/ClientOnly'

const Inscription: NextPage = () => {
  const { push, query } = useRouter()
  const { data, loading, queryError } = useQuery(INSCRIPTION_BY_ID, {
    variables: { id: query.id },
    errorPolicy: 'all',
  })
  const { error: LogError } = useLogger()

  if (queryError) {
    LogError(queryError, 'pages/inscripciones/[id].tsx Inscription.tsx', 'useQuery(INSCRIPTION_BY_ID)', 'UNEXPECTED')
    push('/inscripciones')
  }

  if (loading) return <Loading />
  if (!data || !data.inscription) return <EmptyItem text="La inscripción esta vacía o es invalida" />
  return (
    <div>
      <ClientOnly>
        <InscriptionDetail inscription={data.inscription} />
      </ClientOnly>
    </div>
  )
}

export default Inscription
