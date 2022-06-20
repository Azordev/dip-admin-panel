import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import useLogger from '@/hooks/useLogger'
import CreateCategoryForm from '@/views/Categories/Create'
import { CategoryEditable } from '@/services/GraphQL/categories/types'
import { CREATE_CATEGORY } from '@/services/GraphQL/categories/mutations'

const Create: NextPage = () => {
  const { push } = useRouter()
  const { error } = useLogger()

  const [createEvent, { loading, error: mutationError }] = useMutation(CREATE_CATEGORY)

  const submitHandler = async (newCategory: CategoryEditable) => {
    createEvent({ variables: { ...newCategory } })
    push('/categorias')
  }

  if (mutationError) error(Error(mutationError.message), 'pages/categorias/crear.tsx', 'Error al crear la categoria')

  return (
    <div>
      <h1>Create Category</h1>

      <CreateCategoryForm onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
