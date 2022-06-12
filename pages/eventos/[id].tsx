import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { EVENT_BY_ID } from '@/services/GraphQL/events/queries'
import useLogger from '@/hooks/useLogger'
import ClientOnly from '@/views/Shared/ClientOnly'
import Image from '@/views/Shared/Image'
import { Event as EventFields } from '@/services/GraphQL/events/types'

const Event: NextPage = () => {
  const { data: event, loading, error } = useQuery<EventFields>(EVENT_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (error) {
    LogError(error, 'Event.tsx', 'useQuery(EVENT_BY_ID)', 'UNEXPECTED')
    push('/eventos')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>
        {event && event !== undefined ? (
          <div>
            <h1>{event.title}</h1>
            {event.image_url && <Image src={event.image_url} alt="avatar" />}
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.type}</p>
            {event.requirements_url && (
              <a href={event.requirements_url}>
                <button>Requisitos</button>
              </a>
            )}
          </div>
        ) : (
          <></>
        )}
      </ClientOnly>
    </div>
  )
}

export default Event
