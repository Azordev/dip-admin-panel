import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import { MutableProviderFormProps } from '@/services/GraphQL/providers/types'
import styles from '@/styles/Home.module.css'

import CreateProviderForm from './Form'

const CreateProviderLayout: FC<MutableProviderFormProps> = ({ onSubmit, loading }) => (
  <>
    <BackHeader to="/proveedores" />
    <div className={styles.container}>
      <CreateProviderForm onSubmit={onSubmit} loading={loading} />
    </div>
  </>
)

export default CreateProviderLayout
