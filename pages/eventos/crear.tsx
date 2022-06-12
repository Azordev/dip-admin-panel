import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_EVENT } from '../../services/GraphQL/events/mutations'
import styles from '../../styles/Home.module.css'
import { EventEditable } from '../../services/GraphQL/events/types'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [newEvent, setNewEvent] = useState<EventEditable>()

  const [createEvent] = useMutation(CREATE_EVENT)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newEvent?.title || !newEvent?.description || !newEvent?.type || !newEvent?.date) {
      return
    }

    createEvent({ variables: { ...newEvent } })
    push('/eventos')
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!newEvent) return
    let event = newEvent
    if (e.target.name === 'date') {
      const formattedDate = new Date(e.target.value).toISOString()
      event.date = formattedDate
    }
    event = {
      ...newEvent,
      [e.target.name]: e.target.value,
    }
    setNewEvent(event)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Event</h1>

      <form onSubmit={submitHandler}>
        <input type="text" name="title" onChange={changeHandler} value={newEvent?.title} placeholder="title" />
        <input
          type="text"
          name="description"
          onChange={changeHandler}
          value={newEvent?.description}
          placeholder="description"
        />
        <input type="date" name="datetime-local" onChange={changeHandler} value={newEvent?.date} />
        <input type="text" name="type" onChange={changeHandler} value={newEvent?.type} placeholder="type" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Create
