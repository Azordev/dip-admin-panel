import { FC } from 'react'

import { ProductEditable } from '@/services/GraphQL/products/types'

import CreateProductForm from './Form'

interface CreateProductLayoutProps {
  onSubmit: (_formData: ProductEditable) => void
  loading: boolean
}

const CreateProductLayout: FC<CreateProductLayoutProps> = ({ onSubmit, loading }) => (
  <div className="container">
    <h1 className="title">Create Product</h1>

    <CreateProductForm onSubmit={onSubmit} loading={loading} />

    <style jsx>{`
      .container {
        max-width: 600px;
        margin: 0 auto;
      }
      .title {
        margin-bottom: 1rem;
      }
    `}</style>
  </div>
)

export default CreateProductLayout
