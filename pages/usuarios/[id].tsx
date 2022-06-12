import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import client from '@/services/GraphQL/client'
import { USERS } from '@/services/GraphQL/users/queries'
import { User as UserProp } from '@/services/GraphQL/users/types'
import ClientOnly from '@/views/Shared/ClientOnly'
import Image from '@/views/Shared/Image'

const User: NextPage = () => {
  const [user, setUser] = useState<UserProp>()
  const [loading, setLoading] = useState(true)
  const { push, query } = useRouter()

  useEffect(() => {
    const fetchUser = async (id: string) => {
      const {
        data: { user },
        errors,
      } = await client.query({
        query: USERS,
        variables: {
          id,
        },
      })

      if (errors) {
        push('/usuarios')
      }

      setUser(user)
      setLoading(false)
    }

    if (query.id && query.id.length > 0 && typeof query.id === 'string') {
      fetchUser(query.id)
    }
  }, [query.id, push])

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>
        {typeof user !== undefined && user ? (
          <div>
            {user.avatar_url && <Image src={user.avatar_url} alt={user.member_code} />}
            <h1>
              {user.member_info?.first_names} {user.member_info?.last_names}
            </h1>
            <p>{user.position}</p>
          </div>
        ) : (
          <></>
        )}
      </ClientOnly>
    </div>
  )
}

export default User
