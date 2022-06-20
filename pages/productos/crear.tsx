import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { ProductEditable } from '@/services/GraphQL/products/types'
import CreateProductForm from '@/views/Products/Create'

const Create: NextPage = () => {
  const { push } = useRouter()
  const { error } = useLogger()

  const [createProduct, { loading, error: mutationError }] = useMutation(CREATE_PRODUCT)

  const submitHandler = async (newProduct: ProductEditable) => {
    createProduct({ variables: { ...newProduct } })
    push('/productos')
  }

  if (mutationError) error(Error(mutationError.message), 'pages/productos/crear.tsx', 'Error al crear el producto')

  return (
    <div className="container">
      <h1 className="title">Create Product</h1>

      <CreateProductForm onSubmit={submitHandler} loading={loading} />

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
        .title {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}

export default Create
