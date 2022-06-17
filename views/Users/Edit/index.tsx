import { FC } from 'react'
import { MemberEditable, UserEditable } from '@/services/GraphQL/users/types'
import EditUserForm from './EditUser'
import EditMemberForm from './EditMember'

interface EditUserFormProps {
  submitUser: (_user: UserEditable) => void
  updateUserMutationLoading: boolean
  submitMember: (_member: MemberEditable) => void
  updaterMemberMutationLoading: boolean
}

const EditUserAndMember: FC<EditUserFormProps> = ({
  submitUser,
  updateUserMutationLoading,
  submitMember,
  updaterMemberMutationLoading,
}) => (
  <div>
    <h1>Editar usuario</h1>
    <EditUserForm onSubmit={submitUser} loading={updaterMemberMutationLoading} />

    <h1>Editar miembro</h1>
    <EditMemberForm onSubmit={submitMember} loading={updateUserMutationLoading} />
  </div>
)

export default EditUserAndMember
