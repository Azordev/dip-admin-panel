import { GetStaticPaths } from 'next'
import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_EVENT_BY_ID } from '../../services/GraphQL/queries/events'
import { Event as EventProps } from '../../services/GraphQL/types/events'
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

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_EVENT_BY_ID,
  })

  return {
    props: {
      event: data.event,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { data } = await client.query({
    query: GET_EVENT_BY_ID,
  })

  const paths =
    data.events?.map((event: EventProps) => ({
      params: {
        id: event.id.toString(),
      },
    })) || []
  return {
    paths,
    fallback: 'blocking', // indicates the type of fallback
  }
}
