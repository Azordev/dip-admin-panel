import { FC } from 'react'

import EventItem from '@/components/EventItem'
import { Event } from '@/services/GraphQL/events/types'
import styles from '@/styles/Events.module.css'

const EventsList: FC<{ events: Event[] }> = ({ events }) => (
  <div className={styles.container}>
    <div className={styles['events-list']}>
      {events.map((event: Event) => (
        <EventItem key={`event-${event.id}`} event={event} />
      ))}
    </div>
  </div>
)

export default EventsList
