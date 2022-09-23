import { FC, useEffect, useState } from 'react'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import Loading from '@/components/Loading'
import Paginated from '@/components/Paginated/Paginated'
import { Event } from '@/services/GraphQL/events/types'
import styles from '@/styles/Events.module.scss'
import EventsList from '@/views/Events/List'

interface PaginatedProps {
  events: Event[]
  totalEvents: number
  onchangePage: (limit: number, offset: number) => void
  loading: Boolean
}

const EventsContainers: FC<PaginatedProps> = props => {
  const { events, totalEvents, onchangePage, loading } = props
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const indexOfFirst = currentPage * productsPerPage - productsPerPage
  const indexOfLast = indexOfFirst + events.length

  const showEventList = () =>
    events?.length > 0 ? (
      <div className={styles['events-container']}>
        <EventsList events={events} />
        <Paginated
          itemsPerPage={productsPerPage}
          totalItemsLength={totalEvents}
          data={events}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          indexOfFirst={indexOfFirst}
          indexOfLast={indexOfLast}
        />
      </div>
    ) : (
      <EmptyList className="center-text" text="No hay eventos" />
    )

  useEffect(() => {
    onchangePage(productsPerPage, indexOfFirst)
  }, [indexOfFirst, onchangePage])

  return (
    <div className={styles.relative}>
      <ListHeader createText="Crear nuevo evento" createPath="/eventos/crear" />
      {loading ? <Loading className="center-text" /> : showEventList()}
    </div>
  )
}

export default EventsContainers
