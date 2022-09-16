import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import BackHeader from '@/components/BackHeader'
import useLogger from '@/hooks/useLogger'
import { UPDATE_MEMBER } from '@/services/GraphQL/users/mutations'
import { MemberEditable } from '@/services/GraphQL/users/types'
import EditUserAndMember from '@/views/Users/Edit'

const EditUserInformation: NextPage = () => {
  const { push, query } = useRouter()
  const [updateMember, { loading: updaterMemberMutationLoading, error: updateMemberError }] = useMutation(UPDATE_MEMBER)
  const { error: logError } = useLogger()

  const submitMemberHandler = async (updatedMember: MemberEditable) => {
    await updateMember({
      variables: { ...updatedMember, id: query.id },
    })
    push('/socios')
  }

  if (updateMemberError)
    logError(
      updateMemberError,
      'pages/socios/editar/[id].tsx',
      'Error al actualizar la información de miembro del usuario',
    )

  return (
    <div>
      <BackHeader to="/eventos" />
      <EditUserAndMember submitMember={submitMemberHandler} updateUserMutationLoading={updaterMemberMutationLoading} />
    </div>
  )
}

export default EditUserInformation
