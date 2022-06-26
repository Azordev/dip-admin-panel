import { FC } from 'react'

import { MutableCategoryFormProps } from '@/services/GraphQL/categories/types'

import CreateCategoryForm from './Form'

const CreateCategoryLayout: FC<MutableCategoryFormProps> = ({ onSubmit, loading }) => (
  <div>
    <h1>Create Category</h1>

    <CreateCategoryForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateCategoryLayout
