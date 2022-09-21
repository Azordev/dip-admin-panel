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

    form.append('id', user.providerInfo.id)
    form.append('logoUrl', `${values.logo}`)
    try {
      const response = await axios.put(`/api/providers/${query.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const userResponse = response?.data ?? {}
      const userSession = window.sessionStorage.getItem('user') ?? ''
      const userData = userSession ? JSON.parse(userSession) : {}
      const { providerInfo } = userData ?? {}
      const updatedUser = {
        ...userData,
        providerInfo: {
          ...providerInfo,
          logoUrl: userResponse?.data?.logoUrl ?? '',
        },
      }

      if (userSession) window.sessionStorage.setItem('user', JSON.stringify(updatedUser))

      push('/productos')
    } catch (error) {
      logError(error as Error, 'pages/perfil/editar/[id].tsx', 'Error al crear el evento')
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
