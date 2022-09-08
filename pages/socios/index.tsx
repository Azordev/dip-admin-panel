import { GetServerSideProps, NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import { User } from '@/services/GraphQL/users/types'
import ClientOnly from '@/views/Shared/ClientOnly'

import UsersContainers from 'containers/Socios/UsersContainers'
import { getMembers } from 'controllers/members'

const Users: NextPage<{ users: User[] }> = ({ users }) => {
  if (!users || users.length < 1) return <EmptyList text="La lista de usuarios esta vacía o es invalida." />
  return (
    <ClientOnly>
      <UsersContainers users={users} />
    </ClientOnly>
  )
}

export default Users

export const getServerSideProps: GetServerSideProps = async () => {
  const { users } = await getMembers()

  return {
    props: {
      users: users || [],
    },
  }
}
