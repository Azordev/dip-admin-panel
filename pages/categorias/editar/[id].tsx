import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import UpdateFormContainer from '@/components/UpdateForm'
import useLogger from '@/hooks/useLogger'
import { UPDATE_CATEGORY } from '@/services/GraphQL/categories/mutations'
import { CATEGORY_BY_ID } from '@/services/GraphQL/categories/queries'
import { CategoryEditable } from '@/services/GraphQL/categories/types'
import UpdateCategory from '@/views/Categories/Edit'

const EditCategory: NextPage = () => {
  const [updateCategory, { loading, error: mutationError }] = useMutation(UPDATE_CATEGORY)
  const { push, query } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (updatedCategory: CategoryEditable) => {
    await updateCategory({
      variables: { ...updatedCategory, id: query.id },
    })
    push('/categorias')
  }

  if (mutationError) logError(mutationError, 'pages/categorias/editar/[id].tsx', 'Error al actualizar la categoría')

  return (
    <UpdateFormContainer
      currentDataQuery={CATEGORY_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={UpdateCategory}
      parent="CATEGORÍAS"
    />
  )
}

export default EditCategory
