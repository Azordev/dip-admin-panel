import { FC, useState } from 'react'

import ListHeader from '@/components/ListHeader'
import Paginated from '@/components/Paginated'
import styles from '@/components/Paginated/Paginated.module.scss'
import { User } from '@/services/GraphQL/users/types'
import UsersList from '@/views/Users/List'

interface PaginatedProps {
  users: User[]
}

const UsersContainers: FC<PaginatedProps> = ({ users }) => {
  const [CurrentPage, setCurrentPage] = useState(1)
  const PartnersPerPage = 12
  const indexOfLastPartner = CurrentPage * PartnersPerPage
  const indexOfFirstPartner = indexOfLastPartner - PartnersPerPage
  return (
    <div className={styles.relative}>
      <ListHeader createText="Añadir Socio" createPath="/socios/crear" />
      <UsersList users={users} indexOfFirstPartner={indexOfFirstPartner} indexOfLastPartner={indexOfLastPartner} />
      <Paginated
        PartnersPerPage={PartnersPerPage}
        totalPartnersLength={users.length}
        users={users}
        setCurrentPage={setCurrentPage}
        CurrentPage={CurrentPage}
        indexOfFirstPartner={indexOfFirstPartner}
        indexOfLastPartner={indexOfLastPartner}
      />
    </div>
  )
}

export default UsersContainers
