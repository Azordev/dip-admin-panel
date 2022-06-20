import { FC } from 'react'
import Image from '@/views/Shared/Image'
import { Event } from '@/services/GraphQL/events/types'

const EventDetail: FC<{ event: Event }> = ({ event }) => (
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
)

export default EventDetail
