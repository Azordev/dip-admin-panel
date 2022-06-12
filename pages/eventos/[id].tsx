import React from 'react'
import client from '../../services/GraphQL/client'
import { EVENT_BY_ID } from '../../services/GraphQL/events/queries'
import { Event as EventProps } from '../../services/GraphQL/events/types'
import ClientOnly from '../../views/Shared/ClientOnly'
import Image from '../../views/Shared/Image'

const Event: React.FC<{ event: EventProps }> = ({ event }) => (
  <div>
    <ClientOnly>
      {event && (
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
      )}
    </ClientOnly>
  </div>
)

export default Event

type StaticProps = {
  params: EventProps
}

export async function getStaticProps({ params: { id } }: StaticProps) {
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
    return {
      props: {
        event: null,
      },
    }
  }

  return {
    props: {
      event,
    },
  }
}
