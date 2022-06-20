import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_INSCRIPTION } from '@/services/GraphQL/inscriptions/mutations'
import { InscriptionEditable } from '@/services/GraphQL/inscriptions/types'
import CreateInscriptionForm from '@/views/Inscriptions/Create'

const Create: NextPage = () => {
  const { push } = useRouter()
  const { error } = useLogger()

  const [createInscription, { loading, error: mutationError }] = useMutation(CREATE_INSCRIPTION)

  const submitHandler = async (newInscription: InscriptionEditable) => {
    createInscription({ variables: { ...newInscription } })
    push('/inscripciones')
  }

  if (mutationError)
    error(Error(mutationError.message), 'pages/inscripciones/crear.tsx', 'Error al crear la inscripción')

  return (
    <div>
      <h1>Create Inscription</h1>

      <CreateInscriptionForm onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
