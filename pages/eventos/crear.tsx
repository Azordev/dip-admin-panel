import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_EVENT } from '@/services/GraphQL/events/mutations'
import { EventEditable } from '@/services/GraphQL/events/types'
import styles from '@/styles/Home.module.css'
import CreateEventForm from '@/views/Events/Create'

const Create: NextPage = () => {
  const [createEvent, { loading, error: mutationError }] = useMutation(CREATE_EVENT)
  const { push } = useRouter()
  const { error } = useLogger()

  const submitHandler = async (newEvent: EventEditable) => {
    newEvent.date = new Date(newEvent.date).toISOString()

    createEvent({ variables: { ...newEvent } })
    push('/eventos')
  }

  if (mutationError) error(Error(mutationError.message), 'pages/eventos/crear.tsx', 'Error al crear el evento')

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Event</h1>

      <CreateEventForm onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
