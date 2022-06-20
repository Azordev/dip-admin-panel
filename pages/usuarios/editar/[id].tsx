import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { UPDATE_MEMBER, UPDATE_USER } from '@/services/GraphQL/users/mutations'
import { MemberEditable, UserEditable } from '@/services/GraphQL/users/types'
import EditUserAndMember from '@/views/Users/Edit'

const EditUserInformation: NextPage = () => {
  const [updateUser, { loading: updateUserMutationLoading, error: updaterUserMutationError }] = useMutation(UPDATE_USER)
  const [updateMember, { loading: updaterMemberMutationLoading, error: updateMemberError }] = useMutation(UPDATE_MEMBER)
  const { push, query } = useRouter()
  const { error } = useLogger()

  const submitUserHandler = async (updatedUser: UserEditable) => {
    await updateUser({
      variables: { ...updatedUser, id: query.id },
    })
    push('/usuarios')
  }

  const submitMemberHandler = async (updatedMember: MemberEditable) => {
    await updateMember({
      variables: { ...updatedMember, id: query.id },
    })
    push('/usuarios')
  }

  if (updaterUserMutationError)
    error(Error(updaterUserMutationError.message), 'pages/usuarios/editar/[id].tsx', 'Error al actualizar el usuario')

  if (updateMemberError)
    error(Error(updateMemberError.message), 'pages/usuarios/editar/[id].tsx', 'Error al actualizar el usuario')

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
