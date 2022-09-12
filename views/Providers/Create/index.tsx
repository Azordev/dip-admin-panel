import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import { MutableProviderUserFormProps } from '@/services/GraphQL/users/types'

import CreateProviderForm from './Form'

const CreateProviderLayout: FC<MutableProviderUserFormProps> = ({ onSubmit, loading }) => (
  <div className="flex flex-col hhfull">
    <BackHeader to="/proveedores"/>

    <CreateProviderForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateProviderLayout
