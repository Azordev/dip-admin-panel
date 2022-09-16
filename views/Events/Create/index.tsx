import { FC, FormEvent } from 'react'

import BackHeader from '@/components/BackHeader'
import styles from '@/styles/Home.module.css'

import CreateEventForm, { EventEditableWithFiles } from './Form'

const CreateEventLayout: FC<{
  onSubmit: (_data: EventEditableWithFiles, _e: FormEvent<HTMLFormElement>) => void
  loading: boolean
}> = ({ onSubmit, loading }) => (
  <>
    <BackHeader to="/eventos" />
    <div className={styles.container}>
      <CreateEventForm onSubmit={onSubmit} loading={loading} />
    </div>
  </>
)

export default CreateEventLayout
