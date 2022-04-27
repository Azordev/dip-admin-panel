import type { NextPage } from 'next'
import type { IEvent } from '../../utils/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_EVENT } from '../../services/GraphQL/mutations/events.mutations'
import styles from '../../styles/Home.module.css'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [newEvent, setNewEvent] = useState<IEvent>({
    title: '',
    description: '',
    date: '',
    type: '',
  })

  const [createEvent] = useMutation(CREATE_EVENT)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.type) {
      return
    }

    createEvent({ variables: newEvent })
    push('/')
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
        <input type="text" name="date" onChange={changeHandler} value={newEvent.date} placeholder="date" />
        <input type="text" name="type" onChange={changeHandler} value={newEvent.type} placeholder="type" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Create
