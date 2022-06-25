import { useRouter } from 'next/router'
import { FC } from 'react'

import EventItem from '@/components/EventItem'
import { Event } from '@/services/GraphQL/events/types'
import styles from '@/styles/Events.module.css'

const EventsList: FC<{ events: Event[] }> = ({ events }) => {
  const { push } = useRouter()

  return (
    <>
      <header className={styles['page-header']}>
        <h1 className={styles['header-title']}>Eventos</h1>
        <button className={styles['new-event-button']} onClick={() => push('/eventos/crear')}>
          Crear Evento
        </button>
      </header>
      <div className={styles.container}>
        <div className={styles['events-list']}>
          {events.map((event: Event) => (
            <EventItem key={`event-${event.id}`} event={event} />
          ))}
        </div>
      </div>
    </>
  )
}

export default EventsList
