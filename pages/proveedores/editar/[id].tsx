import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import UpdateFormContainer from '@/components/UpdateForm'
import useLogger from '@/hooks/useLogger'
import { UPDATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import { ProviderEditable } from '@/services/GraphQL/providers/types'
import { UPDATE_USER } from '@/services/GraphQL/users/mutations'
import EditProviderLayout from '@/views/Providers/Edit'

const EditProvider: NextPage = () => {
  const { push, query } = useRouter()
  const [updateProvider, { loading, error: mutationErrorProvider }] = useMutation(UPDATE_PROVIDER)
  const [updateUser, { error: mutationErrorUser }] = useMutation(UPDATE_USER)
  const { error } = useLogger()

  const submitHandler = async (updatedProvider: ProviderEditable) => {
    // console.log(updatedProvider)
    // return null
    await updateUser({
      variables: {
        id: updatedProvider.userId,
        memberCode: updatedProvider.memberCode,
        password: updatedProvider.password,
      },
    })
    await updateProvider({
      variables: { ...updatedProvider, id: query.id },
    })
    push('/proveedores')
  }

  if (mutationErrorProvider || mutationErrorUser)
    error(Error(mutationErrorUser?.message), 'pages/proveedores/editar/[id].tsx', 'Error al actualizar el proveedor')

  return (
    <UpdateFormContainer
      currentDataQuery={PROVIDER_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={EditProviderLayout}
      queryName="provider"
    />
  )
}

export default EditProvider
