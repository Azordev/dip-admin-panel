import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import ClientOnly from '@/views/Shared/ClientOnly'
import { USERS } from '@/services/GraphQL/users/queries'
import { User } from '@/services/GraphQL/users/types'

const Users: NextPage = () => {
  const { push } = useRouter()
  const { data, loading } = useQuery(USERS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!data) {
    return <h2>No hay usuarios</h2>
  }

  const users = data.users

  return (
    <ClientOnly>
      <>
        <header>
          <h1>Usuarios</h1>
          <button onClick={() => push('/usuarios/crear')}>Crear Usuario</button>
        </header>
        <div>
          <div>
            {users.map((user: User) => (
              <div key={user.id}>
                <h2>{user.member_code}</h2>
                <p>{user.position}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    </ClientOnly>
  )
}

export default Users
