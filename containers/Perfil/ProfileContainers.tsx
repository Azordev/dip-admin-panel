import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import ProfileForm from '@/components/ProfileForm'
import UpdateFormContainer from '@/components/UpdateForm'
import useAuth from '@/hooks/useAuth'
import useLogger from '@/hooks/useLogger'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import { ProviderEditable } from '@/services/GraphQL/providers/types'

const ProfileContainers: NextPage = () => {
  const { user } = useAuth()
  const { push, query } = useRouter()
  const { error: logError } = useLogger()
  const [loading, setLoading] = useState<boolean>()
  const submitHandler = async (values: ProviderEditable, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.target as HTMLFormElement)

    form.append('id', `${user.providerInfo.id}`)
    form.append('logoUrl', `${values.logo}`)
    try {
      await axios.put(`/api/providers/${query.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      push('/proveedores')
    } catch (error) {
      logError(error as Error, 'pages/proveedores/editar.tsx', 'Error al crear el evento')
      setLoading(false)
    }
  }

  return (
    <UpdateFormContainer
      currentDataQuery={PROVIDER_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={ProfileForm}
      parentImageUrl={user?.providerInfo.logoUrl}
      commercialName={user?.providerInfo.commercialName}
      queryName="provider"
    />
  )
}

export default ProfileContainers
