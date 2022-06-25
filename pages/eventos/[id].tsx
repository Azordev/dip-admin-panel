import { useQuery } from '@apollo/client'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyItem from '@/components/EmptyItem'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { EVENT_BY_ID } from '@/services/GraphQL/events/queries'
import EventDetail from '@/views/Events/Detail'
import ClientOnly from '@/views/Shared/ClientOnly'

const Event: NextPage = () => {
  const { push, query } = useRouter()
  const { data, loading, error: queryError } = useQuery(EVENT_BY_ID, { variables: { id: query.id } })
  const { error: logError } = useLogger()

  if (queryError) {
    logError(queryError, 'pages/eventos/[id].tsx Event.tsx', 'useQuery(EVENT_BY_ID)', 'UNEXPECTED')
    push('/eventos')
  }

  if (loading) return <Loading />
  if (!data || !data.event) return <EmptyItem text="El evento esta vacío o es invalido." />
  return (
    <ClientOnly>
      <EventDetail event={data.event} />
    </ClientOnly>
  )
}

export default Event
