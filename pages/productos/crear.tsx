import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import BackHeader from '@/components/BackHeader'
import useAuth from '@/hooks/useAuth'
import useLogger from '@/hooks/useLogger'
import { CREATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { ProductEditable } from '@/services/GraphQL/products/types'
import CreateProductLayout from '@/views/Products/Create'

const Create: NextPage = () => {
  const { push } = useRouter()
  const { error: logError } = useLogger()
  const { user, isProvider } = useAuth()

  const [createProduct, { loading, error: mutationError }] = useMutation(CREATE_PRODUCT)

  const submitHandler = async (newProduct: ProductEditable) => {
    await createProduct({ variables: { ...newProduct, providerId: isProvider } })
    Swal.fire({
      title: 'Producto creado',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    push('/productos')
  }

  if (mutationError) logError(Error(mutationError.message), 'pages/productos/crear.tsx', 'Error al crear el producto')

  return (
    <div className="container">
      <BackHeader
        to={'../productos'}
        commercialName={user?.providerInfo.commercialName}
        parentImageUrl={user?.providerInfo.logoUrl}
      />
      <CreateProductLayout onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
