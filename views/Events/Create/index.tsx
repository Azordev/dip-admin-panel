import { FC } from 'react'

import { EventEditable } from '@/services/GraphQL/events/types'
import styles from '@/styles/Home.module.css'

import CreateEventForm from './Form'

interface CreateEventLayoutProps {
  onSubmit: (_formData: EventEditable) => void
  loading: boolean
}

const CreateEventLayout: FC<CreateEventLayoutProps> = ({ onSubmit, loading }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Create Event</h1>

    <CreateEventForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateEventLayout
