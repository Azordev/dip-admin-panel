import React, { useState } from 'react'
import { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { GET_EVENTS, GET_EVENT_BY_ID } from '../../../services/GraphQL/queries/events'
import { UPDATE_EVENT } from '../../../services/GraphQL/mutations/events'
import { Event, EventBase } from '../../../services/GraphQL/types/events'
import client from '../../../services/GraphQL/client'
import ClientOnly from '../../../views/Shared/ClientOnly'
import styles from '../../../styles/Home.module.css'

const EditEvent: NextPage<{ event: Event }> = ({ event }) => {
  const { push } = useRouter()
  const [updatedEvent, setUpdatedEvent] = useState<EventBase>({
    title: event.title,
    description: event.description,
    date: event.date,
    type: event.type,
  })

  const [updateEvent] = useMutation(UPDATE_EVENT)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!updatedEvent.title || !updatedEvent.description || !updatedEvent.date || !updatedEvent.type) {
      return
    }

    await updateEvent({ variables: { ...event, ...updatedEvent } })
    push('/eventos')
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value })

  return (
    <ClientOnly>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>Editar Evento</h1>

          <form onSubmit={submitHandler}>
            <input type="text" name="title" onChange={changeHandler} value={updatedEvent.title} placeholder="title" />
            <input
              type="text"
              name="description"
              onChange={changeHandler}
              value={updatedEvent.description}
              placeholder="description"
            />
            <input
              type="datetime-local"
              name="date"
              onChange={changeHandler}
              value={new Date(updatedEvent.date).toISOString().slice(0, 16)}
              placeholder="date"
            />
            <input type="text" name="type" onChange={changeHandler} value={updatedEvent.type} placeholder="type" />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </ClientOnly>
  )
}

export default EditEvent

type StaticProps = {
  params: Event
}

export async function getStaticProps({ params: { id } }: StaticProps) {
  const {
    data: { event },
    errors,
  } = await client.query({
    query: GET_EVENT_BY_ID,
    variables: {
      id,
    },
  })

  if (errors) {
    return {
      props: {
        event: null,
      },
    }
  }

  return {
    props: {
      event,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const {
    data: { events },
    errors,
  } = await client.query({
    query: GET_EVENTS,
  })

  if (events.length < 1 || errors) {
    return {
      paths: [],
      fallback: false,
    }
  }

  const paths =
    events.map((event: Event) => ({
      params: {
        id: event.id?.toString(),
      },
    })) || []
  return {
    paths,
    fallback: false,
  }
}
