import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_CATEGORY } from '@/services/GraphQL/categories/mutations'
import { CategoryEditable } from '@/services/GraphQL/categories/types'
import CreateCategoryLayout from '@/views/Categories/Create'

const Create: NextPage = () => {
  const [createEvent, { loading, error: mutationError }] = useMutation(CREATE_CATEGORY)
  const { push } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (newCategory: CategoryEditable) => {
    createEvent({ variables: newCategory })
    push('/categorias')
  }

  if (mutationError) logError(mutationError, 'pages/categorias/crear.tsx', 'Error al crear la categoría')

  return <CreateCategoryLayout onSubmit={submitHandler} loading={loading} />
}

export default Create
