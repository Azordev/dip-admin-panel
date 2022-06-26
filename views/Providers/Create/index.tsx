import { FC } from 'react'

import { MutableProviderFormProps } from '@/services/GraphQL/providers/types'
import styles from '@/styles/Home.module.css'

import CreateProviderForm from './Form'

const CreateProviderLayout: FC<MutableProviderFormProps> = ({ onSubmit, loading }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Create Provider</h1>

    <CreateProviderForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateProviderLayout
