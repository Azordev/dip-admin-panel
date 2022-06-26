import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Event } from '@/services/GraphQL/events/types'
import { readableDate } from '@/services/utils/dateFormat'
import styles from '@/styles/Events.module.css'

const EventItem: NextPage<{ event: Event }> = ({ event }) => {
  const { push } = useRouter()

  const toEdit = () => {
    push(`/eventos/editar/${event.id}`)
  }

  return (
    <div className={styles['event-item']}>
      <h2 className={styles['event-header']}>{event.title}</h2>

      <section className={styles['event-content']}>
        <p className={styles['event-date']}>Fecha: {readableDate(event.date)}</p>

        <p className={styles['event-description']}>{event.description}</p>

        <footer>
          <button className={styles['event-item-edit']} onClick={toEdit}>
            Editar
          </button>
        </footer>
      </section>
    </div>
  )
}

export default EventItem
