import { FC } from 'react'

import { Category } from '@/services/GraphQL/categories/types'

import CreateCategoryForm from './Form'

interface CreateCategoryLayoutProps {
  onSubmit: (_formData: Category) => void
  loading: boolean
}

const CreateCategoryLayout: FC<CreateCategoryLayoutProps> = ({ onSubmit, loading }) => (
  <div>
    <h1>Create Category</h1>

    <CreateCategoryForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateCategoryLayout
