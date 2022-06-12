import { FC } from 'react'
import { Event, EventEditable } from '../../../services/GraphQL/events/types'
import styles from '../../../styles/Home.module.css'
import EditEventForm from './EditEventForm'

interface EditEventFormProps {
  onSubmit: (_formData: EventEditable) => void
  loading: boolean
  originalEvent?: Event
}
const Layout: FC<EditEventFormProps> = ({ onSubmit, loading, originalEvent }) => (
  <div>
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Evento</h1>
      <EditEventForm onSubmit={onSubmit} loading={loading} originalEvent={originalEvent} />
    </div>
  </div>
)

export default Layout
