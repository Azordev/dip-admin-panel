import { FC } from 'react'

import { Product, ProductEditable } from '@/services/GraphQL/products/types'

import EditProductForm from './Form'

interface EditProductLayoutProps {
  onSubmit: (_formData: ProductEditable) => void
  loading: boolean
  originalData?: Product
}

const EditProductLayout: FC<EditProductLayoutProps> = ({ onSubmit, loading, originalData }) => (
  <div className="container">
    <h1 className="title">Edit Product</h1>

    <EditProductForm onSubmit={onSubmit} loading={loading} originalData={originalData} />
  </div>
)

export default EditProductLayout
