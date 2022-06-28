import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import BackHeader from '@/components/BackHeader'
import useLogger from '@/hooks/useLogger'
import { CREATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { ProductEditable } from '@/services/GraphQL/products/types'
import CreateProductLayout from '@/views/Products/Create'

const Create: NextPage = () => {
  const { push, query } = useRouter()
  const { error: logError } = useLogger()

  const [createProduct, { loading, error: mutationError }] = useMutation(CREATE_PRODUCT)

  const submitHandler = async (newProduct: ProductEditable) => {
    createProduct({ variables: { ...newProduct } })
    push('/productos')
  }

  if (mutationError) logError(Error(mutationError.message), 'pages/productos/crear.tsx', 'Error al crear el producto')

  return (
    <div className="container">
      <BackHeader parent={(query.provider as string) ?? 'Productos'} parentImageUrl={query['provider-url'] as string} />

      <CreateProductLayout onSubmit={submitHandler} loading={loading} />

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
