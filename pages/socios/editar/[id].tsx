import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { UPDATE_MEMBER, UPDATE_USER } from '@/services/GraphQL/users/mutations'
import { MemberEditable, UserEditable } from '@/services/GraphQL/users/types'
import EditUserAndMember from '@/views/Users/Edit'

const EditUserInformation: NextPage = () => {
  const { push, query } = useRouter()
  const [updateUser, { loading: updateUserMutationLoading, error: updaterUserMutationError }] = useMutation(UPDATE_USER)
  const [updateMember, { loading: updaterMemberMutationLoading, error: updateMemberError }] = useMutation(UPDATE_MEMBER)
  const { error: logError } = useLogger()

  const submitUserHandler = async (updatedUser: UserEditable) => {
    await updateUser({
      variables: { ...updatedUser, id: query.id },
    })
    push('/socios')
  }

  const submitMemberHandler = async (updatedMember: MemberEditable) => {
    await updateMember({
      variables: { ...updatedMember, id: query.id },
    })
    push('/socios')
  }

  if (updaterUserMutationError)
    logError(updaterUserMutationError, 'pages/socios/editar/[id].tsx', 'Error al actualizar la información del usuario')

  if (updateMemberError)
    logError(
      updateMemberError,
      'pages/socios/editar/[id].tsx',
      'Error al actualizar la información de miembro del usuario',
    )

  return (
    <EditUserAndMember
      submitUser={submitUserHandler}
      submitMember={submitMemberHandler}
      updateUserMutationLoading={updateUserMutationLoading}
      updaterMemberMutationLoading={updaterMemberMutationLoading}
    />
  )
}

export default EditUserInformation
