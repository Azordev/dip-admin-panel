import { FC } from 'react'

import ListHeader from '@/components/ListHeader'
import { MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/Home.module.css'

import CreateEventForm from './Form'

const CreateEventLayout: FC<MutableEventFormProps> = ({ onSubmit, loading }) => (
  <div>
    <ListHeader createText="Regresar" nameIcon="less-than--v1" createPath="/eventos" />
    <CreateEventForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateEventLayout
