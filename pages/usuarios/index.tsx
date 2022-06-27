import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import { USERS } from '@/services/GraphQL/users/queries'
import ClientOnly from '@/views/Shared/ClientOnly'
import UsersList from '@/views/Users/List'

const Users: NextPage = () => {
  const { data, loading } = useQuery(USERS)

  if (loading) return <Loading />
  if (!data || data.users.length < 1) return <EmptyList text="La lista de usuarios esta vacía o es invalida." />
  return (
    <ClientOnly>
      <UsersList users={data.users} />
    </ClientOnly>
  )
}

export default Users
