import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import ProfileForm from '@/components/ProfileForm'
import UpdateFormContainer from '@/components/UpdateForm'
import useAuth from '@/hooks/useAuth'
import useLogger from '@/hooks/useLogger'
import { UPDATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import { ProviderEditable } from '@/services/GraphQL/providers/types'

const ProfileContainers: NextPage = () => {
  const { user } = useAuth()
  const { push, query } = useRouter()
  const { error: logError } = useLogger()
  const [updateProvider, { loading, error: mutationError }] = useMutation(UPDATE_PROVIDER)
  const submitHandler = async (updatedProduct: ProviderEditable) => {
    await updateProvider({ variables: { ...updatedProduct, id: query.id } })
    push('/productos')
  }

  if (mutationError) logError(mutationError, 'pages/perfil/editar/[id].tsx', 'Error al actualizar el perfil')

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
