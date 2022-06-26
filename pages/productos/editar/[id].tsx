import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { UPDATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { ProductEditable } from '@/services/GraphQL/products/types'
import EditProductLayout from '@/views/Products/Edit'

const EditProduct: NextPage = () => {
  const { push, query } = useRouter()
  const { error: logError } = useLogger()

  const [updateProduct, { loading, error: mutationError }] = useMutation(UPDATE_PRODUCT)

  const submitHandler = async (updatedProduct: ProductEditable) => {
    await updateProduct({ variables: { ...updatedProduct, id: query.id } })
    push('/productos')
  }

  if (mutationError) logError(mutationError, 'pages/productos/[id].tsx', 'Error al actualizar el producto')

  return <EditProductLayout onSubmit={submitHandler} loading={loading} />
}

export default EditProduct
