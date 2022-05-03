import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_USER_BY_ID } from '../../services/GraphQL/queries/users'
import ClientOnly from '../../views/Shared/ClientOnly'
import Image from '../../views/Shared/Image'

interface Events {
  id: string
  title: string
  description: string
  date: string
  type: string
  image_url: string
  requirements_url: string
}
const Event: React.FC<{ event: Events }> = ({ event }) => {
  return (
    <div>
      <ClientOnly>
        {event && (
          <div>
            <h1>{event.title}</h1>
            <Image src={event.image_url} alt="avatar" />
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.type}</p>
            <a href={event.requirements_url}>
              <button>Requisitos</button>
            </a>
          </div>
        )}
      </ClientOnly>
    </div>
  )
}

export default Event

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_USER_BY_ID,
  })

  return {
    props: {
      user: data.user,
    },
  }
}
