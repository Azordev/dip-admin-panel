import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { EVENTS } from '../../services/GraphQL/events/queries'
import styles from '../../styles/Events.module.css'
import ClientOnly from '../../views/Shared/ClientOnly'
import { Event } from '../../services/GraphQL/events/types'
import EventItem from '../../components/EventItem'

const Events: NextPage = () => {
  const { push } = useRouter()
  const { data, loading } = useQuery(EVENTS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  const events: Event[] = data.events

  return (
    <ClientOnly>
      <>
        <header className={styles['page-header']}>
          <h1 className={styles['header-title']}>Eventos</h1>
          <button className={styles['new-event-button']} onClick={() => push('/eventos/crear')}>
            Crear Evento
          </button>
        </header>
        <div className={styles.container}>
          <div className={styles['events-list']}>
            {events.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      </>
    </ClientOnly>
  )
}

export default Events
