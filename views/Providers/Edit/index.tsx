import { FC, memo } from 'react'

import { MutableProviderFormProps } from '@/services/GraphQL/providers/types'

import EditProviderForm from './Form'

const EditProviderLayout: FC<MutableProviderFormProps> = ({ onSubmit, loading, originalData }) => (
  <EditProviderForm onSubmit={onSubmit} loading={loading} originalData={originalData} />
)

export default memo(EditProviderLayout)
