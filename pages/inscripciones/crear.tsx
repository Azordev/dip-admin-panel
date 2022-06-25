import { useMutation } from '@apollo/client'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_INSCRIPTION } from '@/services/GraphQL/inscriptions/mutations'
import { type InscriptionEditable } from '@/services/GraphQL/inscriptions/types'
import CreateInscriptionLayout from '@/views/Inscriptions/Create'

const Create: NextPage = () => {
  const [createInscription, { loading, error: mutationError }] = useMutation(CREATE_INSCRIPTION)
  const { push } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (newInscription: InscriptionEditable) => {
    createInscription({ variables: newInscription })
    push('/inscripciones')
  }

  if (mutationError) logError(mutationError, 'pages/inscripciones/crear.tsx', 'Error al crear la inscripción')

  return <CreateInscriptionLayout onSubmit={submitHandler} loading={loading} />
}

export default Create
