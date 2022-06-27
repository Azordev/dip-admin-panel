import { FC } from 'react'

import { MutableUserFormProps } from '@/services/GraphQL/users/types'

import CreateUserForm from './Form'

const CreateUserLayout: FC<MutableUserFormProps> = ({ onSubmit, loading }) => (
  <CreateUserForm onSubmit={onSubmit} loading={loading} />
)

export default CreateUserLayout
