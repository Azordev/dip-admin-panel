import { useMutation } from '@apollo/client'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import UpdateFormContainer from '@/components/UpdateForm'
import useAuth from '@/hooks/useAuth'
import useLogger from '@/hooks/useLogger'
import { PRODUCT_BY_ID } from '@/services/GraphQL/products/queries'
import { ProductEditable } from '@/services/GraphQL/products/types'
import EditProductForm from '@/views/Products/Edit'

const EditProduct: NextPage = () => {
  const { user } = useAuth()
  const { push, query } = useRouter()
  const { error: logError } = useLogger()
  const [loading, setLoading] = useState(false)
  const submitHandler = async (values: ProductEditable, e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    try {
      const form = new FormData(e.target as HTMLFormElement)
      form.append('providerId', `${user.providerInfo.id}`)

      await axios.put(`/api/products/${query.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      push('/productos')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <UpdateFormContainer
      currentDataQuery={PRODUCT_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={EditProductForm}
      parentImageUrl={user?.providerInfo.logoUrl}
      commercialName={user?.providerInfo.commercialName}
      queryName="product"
    />
  )
}

export default EditProduct
