import { FC } from 'react'

import { MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/Home.module.css'

import CreateEventForm from './Form'

const CreateEventLayout: FC<MutableEventFormProps> = ({ onSubmit, loading }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Create Event</h1>

    <CreateEventForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateEventLayout
