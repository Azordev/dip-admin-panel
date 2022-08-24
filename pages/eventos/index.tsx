import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { EVENTS } from '@/services/GraphQL/events/queries'
import EventsList from '@/views/Events/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Events: NextPage = () => {
  const { data, loading, error: queryError } = useQuery(EVENTS)
  const { error: logError } = useLogger()

  if (queryError) logError(queryError, 'pages/events/index.tsx', 'No se pudo obtener los eventos de la base de datos')

  if (loading) return <Loading />
  if (!data && data.events.length < 1) return <EmptyList text="No hay eventos" />
  return (
    <ClientOnly>
      <>
        <ListHeader createText="Crear nuevo evento" createPath="/eventos/crear" />
        <EventsList events={data.events} />
      </>
    </ClientOnly>
  )
}

export default Events
