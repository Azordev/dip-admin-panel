import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { UPDATE_SUBSCRIPTION } from '@/services/GraphQL/subscriptions/mutations'
import { SubscriptionEditable } from '@/services/GraphQL/subscriptions/types.d'
import ClientOnly from '@/views/Shared/ClientOnly'
import EditSubscriptionForm from '@/views/Subscriptions/Edit'

const EditSubscription: NextPage = () => {
  const { push, query } = useRouter()
  const { error } = useLogger()

  const [updateSubscription, { loading, error: updateSubscriptionError }] = useMutation(UPDATE_SUBSCRIPTION)

  const submitSubscriptionHandler = async (updatedSubscription: SubscriptionEditable) => {
    await updateSubscription({
      variables: { ...updatedSubscription, id: query.id },
    })
    push('/suscripciones')
  }

  if (updateSubscriptionError)
    error(
      Error(updateSubscriptionError.message),
      'pages/suscripciones/editar/[id].tsx',
      'Error al actualizar la suscripción',
    )

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>
        <EditSubscriptionForm onSubmit={submitSubscriptionHandler} loading={loading} />
      </ClientOnly>
    </div>
  )
}

export default EditSubscription
