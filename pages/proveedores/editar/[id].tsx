import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import UpdateFormContainer from '@/components/UpdateForm'
import useLogger from '@/hooks/useLogger'
import { UPDATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { PROVIDER_BY_ID } from '@/services/GraphQL/providers/queries'
import { ProviderEditable } from '@/services/GraphQL/providers/types'
import EditProviderLayout from '@/views/Providers/Edit'

const EditProvider: NextPage = () => {
  const { push, query } = useRouter()
  const [updateProvider, { loading, error: mutationError }] = useMutation(UPDATE_PROVIDER)
  const { error } = useLogger()

  const submitHandler = async (updatedProvider: ProviderEditable) => {
    await updateProvider({
      variables: { ...updatedProvider, id: query.id },
    })
    push('/proveedores')
  }

  if (mutationError)
    error(Error(mutationError.message), 'pages/proveedores/editar/[id].tsx', 'Error al actualizar el proveedor')

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
