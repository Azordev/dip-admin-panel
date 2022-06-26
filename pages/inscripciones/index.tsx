import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { INSCRIPTIONS } from '@/services/GraphQL/inscriptions/queries'
import InscriptionList from '@/views/Inscriptions/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Inscriptions: NextPage = () => {
  const { data, loading, error: queryError } = useQuery(INSCRIPTIONS)
  const { error: logError } = useLogger()

  if (queryError) logError(queryError, 'pages/inscripciones/index.tsx', 'Hubo un error al traer las inscripciones')

  if (loading) return <Loading />
  if (!data || data.inscriptions.length < 1) return <EmptyList text="No se encontraron inscripciones" />
  return (
    <ClientOnly>
      <InscriptionList inscriptions={data.inscriptions} />
    </ClientOnly>
  )
}

export default Inscriptions
