import { FC, memo } from 'react'

import { MutableProviderFormProps } from '@/services/GraphQL/providers/types'

import EditProviderForm from './Form'

const EditProviderLayout: FC<MutableProviderFormProps> = ({ onSubmit, loading, originalData }) => (
  <div>
    <h1>Editar Proveedor</h1>
    <EditProviderForm onSubmit={onSubmit} loading={loading} originalData={originalData} />
  </div>
)

export default memo(EditProviderLayout)
