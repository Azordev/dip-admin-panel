import { useRouter } from 'next/router'
import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import { MutableProviderFormProps } from '@/services/GraphQL/providers/types'
import styles from '@/styles/Home.module.css'

import CreateProviderForm from './Form'

const CreateProviderLayout: FC<MutableProviderFormProps> = ({ onSubmit, loading }) => {
  const { push, query } = useRouter()

  return (
    <>
      <BackHeader parent={(query.provider as string) ?? 'Provider'} parentImageUrl={query['provider-url'] as string} />
      <div className={styles.container}>
        <h1 className={styles.title}>Create Provider</h1>

        <CreateProviderForm onSubmit={onSubmit} loading={loading} />
      </div>
    </>
  )
}

export default CreateProviderLayout
