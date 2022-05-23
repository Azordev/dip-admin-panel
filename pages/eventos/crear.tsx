import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { INSERT_EVENT } from '../../services/GraphQL/mutations/events'
import styles from '../../styles/Home.module.css'
import { EventBase as Event } from '../../services/GraphQL/types/events'
import { formatDate } from '../../services/utils/dateFormat'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    type: '',
  })
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [createEvent] = useMutation(INSERT_EVENT)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newEvent.title || !newEvent.description || !newEvent.type || !date || !time) {
      return
    }

    createEvent({ variables: { ...newEvent, date: formatDate(date, time) } })
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
        <input type="date" name="date" onChange={e => setDate(e.target.value)} value={date} placeholder="date" />
        <input type="time" name="time" onChange={e => setTime(e.target.value)} value={time} placeholder="date" />
        <input type="text" name="type" onChange={changeHandler} value={newEvent.type} placeholder="type" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Create
