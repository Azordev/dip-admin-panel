import { FC } from 'react'

import { MemberEditable } from '@/services/GraphQL/users/types'

import EditMemberForm from './EditMember'

interface EditUserFormProps {
  updateUserMutationLoading: boolean
  submitMember: (_member: MemberEditable) => void
}

const EditUserAndMember: FC<EditUserFormProps> = ({ updateUserMutationLoading, submitMember }) => (
  <div>
    <EditMemberForm onSubmit={submitMember} loading={updateUserMutationLoading} />
  </div>
)

export default EditUserAndMember
