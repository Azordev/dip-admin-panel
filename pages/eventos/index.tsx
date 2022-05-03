import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_EVENTS } from '../../services/GraphQL/queries/events'
import styles from '../styles/Home.module.css'
import ClientOnly from '../../views/Shared/ClientOnly'

interface IEvent {
  id?: string
  title: string
  description: string
  date: string
  type: string
}

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_EVENTS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  const events: IEvent[] = data.events

  return (
    <ClientOnly>
      <div className={styles.container}>
        <h1 className={styles.title}>Events</h1>

        {events.map(event => (
          <div key={event.id} className={styles.card}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
              {event.date} - {event.type}
            </p>
          </div>
        ))}
      </div>
    </ClientOnly>
  )
}

export default Home
