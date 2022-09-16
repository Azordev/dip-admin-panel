import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import BackHeader from '@/components/BackHeader'
import useAuth from '@/hooks/useAuth'
import useLogger from '@/hooks/useLogger'
import { ProductEditable } from '@/services/GraphQL/products/types'
import CreateProductLayout from '@/views/Products/Create'
const Create: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const { error: logError } = useLogger()
  const { user } = useAuth()

  const submitHandler = async (values: ProductEditable, e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    try {
      const form = new FormData(e.target as HTMLFormElement)
      form.append('providerId', `${user.providerInfo.id}`)
      await axios.post('/api/products', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      push('/productos')
      setLoading(false)
    } catch (error) {
      logError(error as Error, 'pages/productos/crear.tsx', 'Error al crear el producto')
      setLoading(false)
    }
  }

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
