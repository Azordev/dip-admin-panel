import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { UPDATE_CATEGORY } from '@/services/GraphQL/categories/mutations'
import UpdateCategory from '@/views/Categories/Edit'
import useLogger from '@/hooks/useLogger'
import { CategoryEditable } from '@/services/GraphQL/categories/types'
import { CATEGORY_BY_ID } from '@/services/GraphQL/categories/queries'
import UpdateFormContainer from '@/components/UpdateForm'

const EditCategory: NextPage = () => {
  const [updateCategory, { loading, error: mutationError }] = useMutation(UPDATE_CATEGORY)
  const { push, query } = useRouter()
  const { error } = useLogger()

  const submitHandler = async (updatedCategory: CategoryEditable) => {
    await updateCategory({
      variables: { ...updatedCategory, id: query.id },
    })
    push('/categorias')
  }

  if (mutationError)
    error(Error(mutationError.message), 'pages/categorias/editar/[id].tsx', 'Error al actualizar la categoría')

  return (
    <UpdateFormContainer
      currentDataQuery={CATEGORY_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={UpdateCategory}
    />
  )
}

export default EditCategory
