import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import Loading from '@/components/Loading'
import { USERS } from '@/services/GraphQL/users/queries'
import ClientOnly from '@/views/Shared/ClientOnly'

import UsersContainers from 'containers/Socios/UsersContainers'

const Users: NextPage = () => {
  const { data, loading } = useQuery(USERS)

  if (loading) return <Loading />
  if (!data || data.length < 1) return <EmptyList text="La lista de usuarios esta vacía o es invalida." />
  return (
    <ClientOnly>
      <UsersContainers users={data.users} />
    </ClientOnly>
  )
}

export default Users
