import { FC } from 'react'

import { MutableInscriptionFormProps } from '@/services/GraphQL/inscriptions/types'

import CreateInscriptionForm from './Form'

const CreateInscriptionLayout: FC<MutableInscriptionFormProps> = ({ onSubmit, loading }) => (
  <div>
    <h1>Create Inscription</h1>
    <CreateInscriptionForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateInscriptionLayout
