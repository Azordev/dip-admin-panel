import { FC } from 'react'

import { Event } from '@/services/GraphQL/events/types'
import Image from '@/views/Shared/Image'

const EventDetail: FC<{ event: Event }> = ({ event }) => (
  <div>
    <h1>{event.title}</h1>
    {event.imageUrl && <Image src={event.imageUrl} alt="avatar" />}
    <p>{event.description}</p>
    <p>{event.date}</p>
    <p>{event.type}</p>
    {event.requirementsUrl && (
      <a href={event.requirementsUrl}>
        <button>Requisitos</button>
      </a>
    )}
  </div>
)

export default EventDetail
