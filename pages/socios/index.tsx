import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import Paginated from '@/components/Paginated'
import { USERS } from '@/services/GraphQL/users/queries'
import ClientOnly from '@/views/Shared/ClientOnly'
import UsersList from '@/views/Users/List'

const Users: NextPage = () => {
  const { data, loading } = useQuery(USERS)
  const [CurrentPage, setCurrentPage] = useState(1)
  const PartnersPerPage = 2
  const indexOfLastPartner = CurrentPage * PartnersPerPage
  const indexOfFirstPartner = indexOfLastPartner - PartnersPerPage

  if (loading) return <Loading />
  if (!data || data.length < 1) return <EmptyList text="La lista de usuarios esta vacía o es invalida." />
  return (
    <ClientOnly>
      <>
        <UsersList
          users={data.users}
          indexOfFirstPartner={indexOfFirstPartner}
          indexOfLastPartner={indexOfLastPartner}
        />
        <Paginated
          PartnersPerPage={PartnersPerPage}
          totalPartnersLength={data.users.length}
          users={data.users}
          setCurrentPage={setCurrentPage}
          CurrentPage={CurrentPage}
          indexOfFirstPartner={indexOfFirstPartner}
          indexOfLastPartner={indexOfLastPartner}
        />
      </>
    </ClientOnly>
  )
}

export default Users
