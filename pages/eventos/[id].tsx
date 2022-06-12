import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import client from '../../services/GraphQL/client'
import { EVENT_BY_ID } from '../../services/GraphQL/events/queries'
import { Event as EventProps } from '../../services/GraphQL/events/types'
import ClientOnly from '../../views/Shared/ClientOnly'
import Image from '../../views/Shared/Image'

const Event: React.FC = () => {
  const [event, setEvent] = React.useState<EventProps>()
  const [loading, setLoading] = React.useState(true)
  const { push, query } = useRouter()

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const {
        data: { event },
        errors,
      } = await client.query({
        query: EVENT_BY_ID,
        variables: {
          id,
        },
      })

      if (errors) {
        push('/eventos')
      }

      setEvent(event)
      setLoading(false)
    }

    if (query.id && query.id.length > 0 && typeof query.id === 'string') {
      fetchEvent(query.id)
    }
  }, [query.id, push])

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
