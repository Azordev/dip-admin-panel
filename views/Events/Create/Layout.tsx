import { FC } from 'react'
import { EventBase } from '../../../services/GraphQL/types/events'
import styles from '../../../styles/Home.module.css'
import EditEventForm from './EditEventForm'

interface EditEventFormProps {
  onSubmit: (formData: EventBase) => void
  loading: boolean
  originalEvent?: EventBase
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
