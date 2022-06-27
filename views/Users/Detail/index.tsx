import { FC, memo } from 'react'

import { User } from '@/services/GraphQL/users/types'
import Image from '@/views/Shared/Image'

const UserDetail: FC<{ user: User }> = ({ user }) => (
  <div>
    {user.avatarUrl && <Image src={user.avatarUrl} alt={user.memberCode} />}
    <h1>
      {user.memberInfo?.firstNames} {user.memberInfo?.lastNames}
    </h1>
    <p>{user.position}</p>
  </div>
)

export default memo(UserDetail)
