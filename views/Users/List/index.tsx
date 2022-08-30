import { FC } from 'react'

import { User } from '@/services/GraphQL/users/types'

const UsersList: FC<{ users: User[] }> = ({ users }) => {
  return (
    <>
      <div>
        <div>
          {users.map((user: User) => (
            <div key={user.id}>
              <h2>{user.memberCode}</h2>
              <p>{user.position}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UsersList
