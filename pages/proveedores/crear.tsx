import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { ProviderEditable } from '@/services/GraphQL/providers/types'
import CreateProviderLayout from '@/views/Providers/Create'

const Create: NextPage = () => {
  const [createProvider, { loading, error: mutationError }] = useMutation(CREATE_PROVIDER)
  const { push } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (newProvider: ProviderEditable) => {
    if (!newProvider?.commercialName || !newProvider?.b2bEmail) {
      return
    }

    createProvider({ variables: newProvider })
    push('/proveedores')
  }

  if (mutationError) logError(mutationError, 'pages/proveedores/crear.tsx')
  return <CreateProviderLayout onSubmit={submitHandler} loading={loading} />
}

export default Create
