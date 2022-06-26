import { FC, memo } from 'react'

import { Provider, ProviderEditable } from '@/services/GraphQL/providers/types'

import EditProviderForm from './Form'

interface EditProviderLayoutProps {
  onSubmit: (_formData: ProviderEditable) => void
  loading: boolean
  originalData?: Provider
}

const EditProviderLayout: FC<EditProviderLayoutProps> = ({ onSubmit, loading, originalData }) => (
  <div>
    <h1>Editar Proveedor</h1>
    <EditProviderForm onSubmit={onSubmit} loading={loading} originalData={originalData} />
  </div>
)

export default memo(EditProviderLayout)
