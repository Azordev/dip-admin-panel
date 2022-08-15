import { NextPage } from 'next'
import Link from 'next/link'

import { Event } from '@/services/GraphQL/events/types'
import { readableDate } from '@/services/utils/dateFormat'
import styles from '@/styles/Events.module.css'
import LogoDID from '@/views/SVGs/LogoDID/LogoDID'

const EventItem: NextPage<{ event: Event }> = ({ event }) => (
  <Link href={`/eventos/editar/${event.id}`} passHref>
    <a className={styles['event-item']}>
      <div className={styles['logo-container']}>
        <LogoDID className={styles.logo} />
      </div>
      <h2 className={styles['event-header']}>{event.title}</h2>

      <section className={styles['event-content']}>
        <p className={styles['event-date']}>{readableDate(event.date)}</p>
      </section>
    </a>
  </Link>
)

export default EventItem
