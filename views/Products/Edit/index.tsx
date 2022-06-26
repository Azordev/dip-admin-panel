import { FC } from 'react'

import { MutableProductFormProps } from '@/services/GraphQL/products/types'

import EditProductForm from './Form'

const EditProductLayout: FC<MutableProductFormProps> = ({ onSubmit, loading, originalData }) => (
  <div className="container">
    <h1 className="title">Edit Product</h1>

    <EditProductForm onSubmit={onSubmit} loading={loading} originalData={originalData} />
  </div>
)

export default EditProductLayout
