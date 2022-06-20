import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import useLogger from '@/hooks/useLogger'
import ClientOnly from '@/views/Shared/ClientOnly'
import { INSCRIPTION_BY_ID } from '@/services/GraphQL/inscriptions/queries'

const Inscription: NextPage = () => {
  const { data, loading, error } = useQuery(INSCRIPTION_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (error) {
    LogError(error, 'pages/inscripciones/[id].tsx Inscription.tsx', 'useQuery(INSCRIPTION_BY_ID)', 'UNEXPECTED')
    push('/inscripciones')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>{data && data !== undefined ? <></> : <></>}</ClientOnly>
    </div>
  )
}

export default Inscription
