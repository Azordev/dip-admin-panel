import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { EVENT_BY_ID } from '@/services/GraphQL/events/queries'
import { Event as EventFields } from '@/services/GraphQL/events/types'
import useLogger from '@/hooks/useLogger'
import ClientOnly from '@/views/Shared/ClientOnly'
import EventDetail from '@/views/Events/Detail'

const Event: NextPage = () => {
  const { data: event, loading, error } = useQuery<EventFields>(EVENT_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (error) {
    LogError(error, 'pages/eventos/[id].tsx Event.tsx', 'useQuery(EVENT_BY_ID)', 'UNEXPECTED')
    push('/eventos')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>{event && event !== undefined ? <EventDetail event={event} /> : <></>}</ClientOnly>
    </div>
  )
}

export default Event
