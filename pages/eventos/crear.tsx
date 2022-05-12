import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { INSERT_EVENT } from '../../services/GraphQL/mutations/events'
import styles from '../../styles/Home.module.css'
import { EventBase as Event } from '../../services/GraphQL/types/events'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    description: '',
    date: 0,
    type: '',
  })

  const [createEvent] = useMutation(INSERT_EVENT)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.type) {
      return
    }

    createEvent({ variables: newEvent })
    push('/eventos')
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Event</h1>

      <form onSubmit={submitHandler}>
        <input type="text" name="title" onChange={changeHandler} value={newEvent.title} placeholder="title" />
        <input
          type="text"
          name="description"
          onChange={changeHandler}
          value={newEvent.description}
          placeholder="description"
        />
        <input
          type="datetime-local"
          name="date"
          onChange={changeHandler}
          value={new Date(newEvent.date).toISOString()}
          placeholder="date"
        />
        <input type="text" name="type" onChange={changeHandler} value={newEvent.type} placeholder="type" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Create
