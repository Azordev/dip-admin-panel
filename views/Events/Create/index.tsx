import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import { MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/Home.module.css'

import CreateEventForm from './Form'

const CreateEventLayout: FC<MutableEventFormProps> = ({ onSubmit, loading }) => (
  <>
    <BackHeader parent="" />
    <div className={styles.container}>
      <CreateEventForm onSubmit={onSubmit} loading={loading} />
    </div>
  </>
)

export default CreateEventLayout
