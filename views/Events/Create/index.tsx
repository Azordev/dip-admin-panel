import { useRouter } from 'next/router'
import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import { MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/Home.module.css'

import CreateEventForm from './Form'

const CreateEventLayout: FC<MutableEventFormProps> = ({ onSubmit, loading }) => {
  const { push, query } = useRouter()

  return (
    <>
      <BackHeader parent={(query.provider as string) ?? 'Events'} parentImageUrl={query['provider-url'] as string} />
      <div className={styles.container}>
        <h1 className={styles.title}>Create Event</h1>

        <CreateEventForm onSubmit={onSubmit} loading={loading} />
      </div>
    </>
  )
}
export default CreateEventLayout
