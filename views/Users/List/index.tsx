import { FC } from 'react'

import { User } from '@/services/GraphQL/users/types'

import styles from './userlist.module.scss'

const UsersList: FC<{ users: User[]; indexOfFirstPartner: number; indexOfLastPartner: number }> = ({
  users,
  indexOfFirstPartner,
  indexOfLastPartner,
}) => {
  const { push } = useRouter()
  const sliceUsers = users.slice(indexOfFirstPartner, indexOfLastPartner)
  return (
    <div className={styles['userlist-container']}>
      <header>
        <h1>Usuarios</h1>
        <button onClick={() => push('/socios/crear')}>Crear Usuario</button>
      </header>
      <div>
        <div>
          {sliceUsers.map((user: User) => (
            <div key={user.id}>
              <h2>{user.memberCode}</h2>
              <p>{user.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UsersList
