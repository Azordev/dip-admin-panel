import { useMutation } from '@apollo/client'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { UPDATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { type ProductEditable } from '@/services/GraphQL/products/types'
import EditProductForm from '@/views/Products/Edit'

const EditProduct: NextPage = () => {
  const { push, query } = useRouter()
  const { error } = useLogger()

  const [updateProduct, { loading, error: mutationError }] = useMutation(UPDATE_PRODUCT)

  const submitHandler = async (updatedProduct: ProductEditable) => {
    await updateProduct({ variables: { ...updatedProduct, id: query.id } })
    push('/productos')
  }

  if (mutationError) error(mutationError, 'pages/productos/[id].tsx', 'Error al actualizar el producto')

  return (
    <div className="container">
      <h1 className="title">Edit Product</h1>

      <EditProductForm onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default EditProduct
