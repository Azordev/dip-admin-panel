import { FC } from 'react'

import { MutableProductFormProps } from '@/services/GraphQL/products/types'

import CreateProductForm from './Form'

const CreateProductLayout: FC<MutableProductFormProps> = ({ onSubmit, loading }) => (
  <div className="container">
    <CreateProductForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateProductLayout
