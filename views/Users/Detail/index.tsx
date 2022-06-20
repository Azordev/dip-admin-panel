import { FC, memo } from 'react'

import { User } from '@/services/GraphQL/users/types'
import Image from '@/views/Shared/Image'

const UserDetail: FC<{ user: User }> = ({ user }) => (
  <div>
    {user.avatar_url && <Image src={user.avatar_url} alt={user.member_code} />}
    <h1>
      {user.member_info?.first_names} {user.member_info?.last_names}
    </h1>
    <p>{user.position}</p>
  </div>
)

export default memo(UserDetail)
