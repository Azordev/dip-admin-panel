import { FC } from 'react'

import { type InscriptionEditable } from '@/services/GraphQL/inscriptions/types'

import CreateInscriptionForm from './Form'

interface CreateInscriptionLayoutProps {
  onSubmit: (_formData: InscriptionEditable) => void
  loading: boolean
}

const CreateInscriptionLayout: FC<CreateInscriptionLayoutProps> = ({ onSubmit, loading }) => (
  <div>
    <h1>Create Inscription</h1>
    <CreateInscriptionForm onSubmit={onSubmit} loading={loading} />
  </div>
)

export default CreateInscriptionLayout
